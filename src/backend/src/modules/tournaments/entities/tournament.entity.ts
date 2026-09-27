import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Index } from 'typeorm';
import { TournamentPlayer } from '@/modules/tournaments/entities/tournament-player.entity';
import { Match } from '@/modules/matches/entities/match.entity';

export type TournamentStatus = 'scheduled' | 'ongoing' | 'completed';

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('idx_tournaments_name')
  @Column({ length: 255 })
  name: string;

  @Column({ name: 'start_time', type: 'datetime' })
  startTime: Date;

  @Column({ name: 'max_players', type: 'int' })
  maxPlayers: number;

  @Column({ type: 'enum', enum: ['scheduled', 'ongoing', 'completed'], default: 'scheduled' })
  status: TournamentStatus;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;

  @OneToMany(() => TournamentPlayer, tp => tp.tournament)
  tournamentPlayers: TournamentPlayer[];

  @OneToMany(() => Match, m => m.tournament)
  matches: Match[];
}