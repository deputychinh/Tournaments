import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from '@/modules/tournaments/entities/tournament.entity';
import { TournamentPlayer } from '@/modules/tournaments/entities/tournament-player.entity';
import { Player } from '@/modules/players/entities/player.entity';
import { Match } from '@/modules/matches/entities/match.entity';
import { ListTournamentsDto } from '@/modules/tournaments/dtos/list-tournaments.dto';
import { JoinTournamentDto } from '@/modules/tournaments/dtos/join-tournament.dto';
import { CreateTournamentDto } from '@/modules/tournaments/dtos/create-tournament.dto';
import { toTournamentSummary, toMatchRow } from '@/helpers/tournament';

@Injectable()
export class TournamentsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Tournament) private readonly tournamentRepo: Repository<Tournament>,
    @InjectRepository(TournamentPlayer) private readonly tpRepo: Repository<TournamentPlayer>,
    @InjectRepository(Player) private readonly playerRepo: Repository<Player>,
    @InjectRepository(Match) private readonly matchRepo: Repository<Match>,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  // GET /api/tournaments  -> array of summaries (camelCase)
  async list(dto: ListTournamentsDto) {
    // TODO: will be consider about caching if data is not changing frequently
    const cacheKey = `tournaments:list:${dto.search || ''}:${dto.status || ''}:${dto.page || 1}:${dto.pageSize || 20}`;
    const cached = await this.cache.get<any[]>(cacheKey);
    if (cached) return cached;

    const page = dto.page ?? 1;
    const pageSize = dto.pageSize ?? 20;

    const qb = this.tournamentRepo
      .createQueryBuilder('t')
      .leftJoin(TournamentPlayer, 'tp', 'tp.tournamentId = t.id')
      .addSelect('COUNT(DISTINCT tp.playerId)', 'participantCount')
      .groupBy('t.id')
      .orderBy('t.startTime', 'ASC')
      .offset((page - 1) * pageSize)
      .limit(pageSize);

    if (dto.search) qb.andWhere('t.name LIKE :q', { q: `%${dto.search}%` });
    if (dto.status) qb.andWhere('t.status = :status', { status: dto.status });

    const { raw, entities } = await qb.getRawAndEntities();

    const items = entities.map((t, i) => {
      const count = Number(raw[i]?.participantCount ?? 0);
      return toTournamentSummary(t, count);
    });

    await this.cache.set(cacheKey, items, 60_000);
    return items;
  }

  // GET /api/tournaments/:id -> object with matches[] and participants[]
  async getDetails(id: number) {
    // TODO: will be consider about caching if data is not changing frequently
    const cacheKey = `tournaments:details:${id}`;
    const cached = await this.cache.get<any>(cacheKey);
    if (cached) return cached;

    const t = await this.tournamentRepo.findOne({ where: { id } });
    if (!t) throw new NotFoundException('Tournament not found');

    const participantsRaw = await this.tpRepo
      .createQueryBuilder('tp')
      .innerJoin(Player, 'p', 'p.id = tp.playerId')
      .select([
        'p.id AS id',
        'p.username AS username',
        'p.email AS email',
        'tp.joinedAt AS joinedAt',
      ])
      .where('tp.tournamentId = :id', { id })
      .orderBy('tp.joinedAt', 'ASC')
      .getRawMany();

    const participantCount = participantsRaw.length;

    const matches = await this.matchRepo.find({
      where: { tournamentId: id },
      order: { round: 'ASC', matchNumber: 'ASC' },
      relations: ['player1', 'player2', 'winner'],
    });

    const payload = {
      ...toTournamentSummary(t, participantCount),
      matches: matches.map(toMatchRow),
      participants: participantsRaw,
    };

    await this.cache.set(cacheKey, payload, 60_000);
    return payload;
  }

  async create(dto: CreateTournamentDto) {
    const ent = this.tournamentRepo.create({
      name: dto.name,
      startTime: new Date(dto.startTime),
      maxPlayers: dto.maxPlayers,
      status: dto.status,
    });
    const saved = await this.tournamentRepo.save(ent);
    await this.cache.reset();
    return toTournamentSummary(saved, 0);
  }

  // POST /api/tournaments/:id/join (transaction + pessimistic lock)
  async join(tournamentId: number, body: JoinTournamentDto) {
    const { playerId } = body;
    const player = await this.playerRepo.findOne({ where: { id: playerId } });
    if (!player) throw new NotFoundException('Player not found');

    const { summary, tournamentName } = await this.dataSource.transaction(async (manager) => {
      const t = await manager
        .createQueryBuilder(Tournament, 't')
        .setLock('pessimistic_write')
        .where('t.id = :id', { id: tournamentId })
        .getOne();

      if (!t) throw new NotFoundException('Tournament not found');
      if (t.status === 'completed') throw new BadRequestException('Tournament completed');

      const duplicate = await manager.findOne(TournamentPlayer, { where: { tournamentId, playerId } });
      if (duplicate) throw new BadRequestException('Player already joined');

      const count = await manager
        .createQueryBuilder(TournamentPlayer, 'tp')
        .where('tp.tournamentId = :id', { id: tournamentId })
        .getCount();
      if (count >= t.maxPlayers) throw new BadRequestException('Tournament is full');

      const tp = manager.create(TournamentPlayer, { tournamentId, playerId, joinedAt: new Date() });
      await manager.save(tp);

      const updatedCount = count + 1;
      return {
        tournamentName: t.name,
        summary: toTournamentSummary(t, updatedCount),
      };
    });

    // TODO: Clear cache only for the tournament details and list
    await this.cache.reset();

    return {
      message: `Player ${player.username} successfully joined tournament ${tournamentName}`,
      tournament: summary,
    };
  }
}