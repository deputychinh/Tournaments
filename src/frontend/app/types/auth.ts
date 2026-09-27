export interface ILoginRequest {
	email: string
	name: string
}

export interface ILoginResponse {
	accessToken: string
	refreshToken: string
	user: {
		id: number
		email: string
		username: string
	}
}

export interface IRefreshResponse {
	accessToken: string
}

export type TJwtPayload = { playerId: number; email: string; username: string }
