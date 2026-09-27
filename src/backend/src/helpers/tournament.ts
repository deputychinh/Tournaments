import { Tournament } from "@/modules/tournaments/entities/tournament.entity";
import { Match } from "@/modules/matches/entities/match.entity";

export const toTournamentSummary = (t: Tournament, participantCount: number) => {
	return {
		id: t.id,
		name: t.name,
		startTime: t.startTime,
		maxPlayers: t.maxPlayers,
		status: t.status,
		participantCount,
		isFull: participantCount >= t.maxPlayers,
		createdAt: t.createdAt,
		updatedAt: t.updatedAt,
	};
}

export const toMatchRow = (m: Match) => {
	return {
		id: m.id,
		round: m.round,
		matchNumber: m.matchNumber,
		player1: m.player1 ? { id: m.player1.id, username: m.player1.username } : null,
		player2: m.player2 ? { id: m.player2.id, username: m.player2.username } : null,
		winner: m.winner ? { id: m.winner.id, username: m.winner.username } : null,
		scheduledAt: m.scheduledAt,
		reportedAt: m.reportedAt,
	};
}