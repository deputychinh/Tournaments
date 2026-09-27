import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { Tournament } from '@/modules/tournaments/entities/tournament.entity';
import { Player } from '@/modules/players/entities/player.entity';

@Entity('tournament_players')
@Unique(['tournamentId', 'playerId']) 
export class TournamentPlayer {
	@PrimaryColumn({ name: 'tournament_id', type: 'int' })
	tournamentId: number;

	@PrimaryColumn({ name: 'player_id', type: 'int' })
	playerId: number;

	@Column({ name: 'joined_at', type: 'datetime' })
	joinedAt: Date;

	@ManyToOne(() => Tournament, t => t.tournamentPlayers, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'tournament_id' })
	tournament: Tournament;

	@ManyToOne(() => Player, p => p.tournamentPlayers, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'player_id' })
	player: Player;
}