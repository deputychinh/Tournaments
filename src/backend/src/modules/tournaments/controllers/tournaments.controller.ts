import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TournamentsService } from '@/modules/tournaments/services/tournaments.service';
import { ListTournamentsDto } from '@/modules/tournaments/dtos/list-tournaments.dto';
import { JoinTournamentDto } from '@/modules/tournaments/dtos/join-tournament.dto';
import { CreateTournamentDto } from '@/modules/tournaments/dtos/create-tournament.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('tournaments')
@Controller('/tournaments')
export class TournamentsController {
	constructor(private readonly service: TournamentsService) { }

	@Get()
	list(@Query() dto: ListTournamentsDto) {
		return this.service.list(dto);
	}

	@Get(':id')
	details(@Param('id', ParseIntPipe) id: number) {
		return this.service.getDetails(id);
	}

	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@Post()
	create(@Body() dto: CreateTournamentDto) {
		return this.service.create(dto);
	}

	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@Post(':id/join')
	join(@Param('id', ParseIntPipe) id: number, @Body() dto: JoinTournamentDto) {
		return this.service.join(id, dto);
	}
}