import { TypeOrmModule } from "@nestjs/typeorm";
import { Tournament } from "@/modules/tournaments/entities/tournament.entity";
import { TournamentsController } from "@/modules/tournaments/controllers/tournaments.controller";
import { TournamentsService } from "@/modules/tournaments/services/tournaments.service";
import { TournamentPlayer } from "@/modules/tournaments/entities/tournament-player.entity";
import { Match } from "@/modules/matches/entities/match.entity";
import { Player } from "@/modules/players/entities/player.entity";
import { Module } from "@nestjs/common";

@Module({
	imports: [TypeOrmModule.forFeature([Tournament, TournamentPlayer, Match, Player])],
	controllers: [TournamentsController],
	providers: [TournamentsService],
})
export class TournamentsModule { }