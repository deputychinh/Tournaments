import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '@/modules/auth/auth.service';
import { LoginDto } from '@/modules/auth/dtos/login.dto';
import { RefreshDto } from '@/modules/auth/dtos/refresh.dto';


@ApiTags('auth')
@Controller('/auth')
export class AuthController {
	constructor(private service: AuthService) { }

	@Post('login')
	@HttpCode(200)
	login(@Body() body: LoginDto) {
		return this.service.login(body.email, body.name);
	}

	@Post('refresh')
	@HttpCode(200)
	refresh(@Body() body: RefreshDto) {
		return this.service.refresh(body.refreshToken);
	}
}