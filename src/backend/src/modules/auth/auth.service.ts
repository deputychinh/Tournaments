import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Player } from '@/modules/players/entities/player.entity';
import { TJwtPayload } from '@/types/jwt';
@Injectable()
export class AuthService {
	constructor(
		private readonly jwt: JwtService,
		private readonly cfg: ConfigService,
		@InjectRepository(Player)
		private readonly playerRepo: Repository<Player>,
	) { }

	async login(email: string, name?: string) {
		if (!email) throw new UnauthorizedException('Email required');

		let player = await this.playerRepo.findOne({ where: { email } });
		if (!player) {
			player = this.playerRepo.create({
				email,
				username: name
			});
			player = await this.playerRepo.save(player);
		}
		
		const payload: TJwtPayload = { playerId: player.id, email: player.email, username: player.username };
		
		const access = await this.jwt.signAsync(payload, {
			secret: this.cfg.get('JWT_ACCESS_SECRET'),
			expiresIn: Number(this.cfg.get('JWT_ACCESS_TTL', '900')),
		});

		const refresh = await this.jwt.signAsync(payload, {
			secret: this.cfg.get('JWT_REFRESH_SECRET'),
			expiresIn: Number(this.cfg.get('JWT_REFRESH_TTL', '604800')),
		});

		return {
			accessToken: access,
			refreshToken: refresh,
		};
	}

	async refresh(refreshToken: string) {
		if (!refreshToken) throw new UnauthorizedException('Missing refresh token');

		try {
			const decoded = await this.jwt.verifyAsync<TJwtPayload>(
				refreshToken,
				{ secret: this.cfg.get('JWT_REFRESH_SECRET') },
			);

			const player = await this.playerRepo.findOne({ where: { id: decoded.playerId } });
			if (!player) {
				throw new NotFoundException('User not found')
			};
			
			const payload: TJwtPayload = { playerId: player.id, email: player.email, username: player.username };
			const accessToken = await this.jwt.signAsync(payload, {
				secret: this.cfg.get('JWT_ACCESS_SECRET'),
				expiresIn: Number(this.cfg.get('JWT_ACCESS_TTL', '900')),
			});

			return { accessToken };
		} catch {
			throw new UnauthorizedException('Invalid or expired refresh token');
		}
	}
}