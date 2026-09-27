import { IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JoinTournamentDto {
	@ApiProperty({ example: 1 })
	@IsNotEmpty()
	@IsPositive()
	playerId: number;
}