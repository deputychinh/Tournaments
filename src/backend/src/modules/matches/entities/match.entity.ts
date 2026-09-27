import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Index } from 'typeorm';
import { Tournament } from '@/modules/tournaments/entities/tournament.entity';
import { Player } from '@/modules/players/entities/player.entity';

@Entity('matches')
export class Match {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Tournament, t => t.matches, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'tournament_id' })
	@Index('idx_matches_t')
	tournament: Tournament;

	@Column({ name: 'tournament_id', type: 'int' })
	tournamentId: number;

	@Column({ type: 'int' })
	round: number;

	@Column({ name: 'match_number', type: 'int' })
	matchNumber: number;

	@ManyToOne(() => Player, { nullable: true, onDelete: 'SET NULL' })
	@JoinColumn({ name: 'player1_id' })
	player1: Player | null;

	@Column({ name: 'player1_id', type: 'int', nullable: true })
	player1Id: number | null;

	@ManyToOne(() => Player, { nullable: true, onDelete: 'SET NULL' })
	@JoinColumn({ name: 'player2_id' })
	player2: Player | null;

	@Column({ name: 'player2_id', type: 'int', nullable: true })
	player2Id: number | null;

	@Column({ name: 'scheduled_at', type: 'datetime', nullable: true })
	scheduledAt: Date | null;

	@ManyToOne(() => Player, { nullable: true, onDelete: 'SET NULL' })
	@JoinColumn({ name: 'winner_id' })
	winner: Player | null;

	@Column({ name: 'winner_id', type: 'int', nullable: true })
	winnerId: number | null;

	@Column({ name: 'reported_at', type: 'datetime', nullable: true })
	reportedAt: Date | null;

	@CreateDateColumn({ name: 'created_at', type: 'datetime' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
	updatedAt: Date;
}