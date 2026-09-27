import { IsIn, IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import type { TTournamentStatus } from '@/types';
import { TOURNAMENT_STATUS } from '@/constants/tournaments';

export class ListTournamentsDto {
	@ApiPropertyOptional({
		example: 'Winter',
		description: 'Search keyword to filter tournaments by name',
	})
	@IsOptional()
	@IsString()
	search?: string;

	@ApiPropertyOptional({
		example: 'scheduled',
		description: 'Filter by tournament status',
		enum: TOURNAMENT_STATUS,
	})
	@IsOptional()
	@IsIn([...TOURNAMENT_STATUS])
	status?: TTournamentStatus;

	@ApiPropertyOptional({
		example: 1,
		description: 'Page number for pagination (must be >= 1)',
		minimum: 1,
		default: 1,
	})
	@IsOptional()
	@IsInt()
	@Min(1)
	page?: number = 1;

	@ApiPropertyOptional({
		example: 20,
		description: 'Number of results per page (must be > 0)',
		minimum: 1,
		default: 20,
	})
	@IsOptional()
	@IsInt()
	@IsPositive()
	pageSize?: number = 20;
}