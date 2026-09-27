import { IsDate, IsIn, IsNotEmpty, IsString, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import type { TTournamentStatus } from '@/types';
import { TOURNAMENT_STATUS } from "@/constants/tournaments";

export class CreateTournamentDto {
    @ApiProperty({
      example: "Winter Cup 2025",
      description: "Name of the tournament",
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
      example: "2025-12-01T18:00:00Z",
      description: "Start time of the tournament (ISO8601 format)",
      type: String,
      format: "date-time",
    })
    @IsNotEmpty()
    @IsDate()
    startTime: Date;

    @ApiProperty({
      example: 16,
      description: "Maximum number of players allowed in the tournament",
      minimum: 2,
    })
    @IsNotEmpty()
    @IsPositive()
    maxPlayers: number;

    @ApiProperty({
      example: "scheduled",
      description: "Status of the tournament",
      enum: TOURNAMENT_STATUS,
    })
    @IsIn([...TOURNAMENT_STATUS])
    status: TTournamentStatus;
}