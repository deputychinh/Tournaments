// Basic player info
export interface IPlayer {
  id: number
  username: string
  email: string
  joinedAt?: string // appears in participants
}

// Match info inside a tournament
export interface IMatch {
  id: number
  round: number
  matchNumber: number
  player1: IPlayer | null
  player2: IPlayer | null
  winner: IPlayer | null
  scheduledAt: string | null
  reportedAt: string | null
}

export interface ITournamentSummary {
  id: number
  name: string
  startTime: string
  maxPlayers: number
  status: TTournamentStatus
  participantCount: number
  isFull: boolean
  createdAt: string
  updatedAt: string
}

export interface ITournamentDetail extends ITournamentSummary {
  matches: IMatch[]
  participants: IPlayer[]
}

export interface IJoinTournamentResponse {
  message: string
  tournament: ITournamentSummary
}

export interface ITournamentQuery {
  search?: string
  status?: string
  page?: number
  pageSize?: number
}

export type TTournamentStatus = 'scheduled' | 'ongoing' | 'completed' | 'all'