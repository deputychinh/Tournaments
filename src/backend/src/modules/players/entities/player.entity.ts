import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TournamentPlayer } from '@/modules/tournaments/entities/tournament-player.entity';
import { Match } from '@/modules/matches/entities/match.entity';

@Entity('players')
export class Player {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 64 })
	username: string;

	@Column({ length: 255, unique: true })
	email: string;

	@CreateDateColumn({ name: 'created_at', type: 'datetime' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
	updatedAt: Date;

	@OneToMany(() => TournamentPlayer, tp => tp.player)
	tournamentPlayers: TournamentPlayer[];

	@OneToMany(() => Match, m => m.player1)
	matchesAsP1: Match[];

	@OneToMany(() => Match, m => m.player2)
	matchesAsP2: Match[];

	@OneToMany(() => Match, m => m.winner)
	matchesWon: Match[];
}