import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
        private userService: UsersService

    ) {}

    @Post('register')
    async register(
        @Body() createUserDto: CreateUserDto
    ): Promise<{token: string}> {
        const token= await this.authService.register(createUserDto);
        return { token };
    }

    @Post('login')
    async login(
        @Body() loginDto: LoginDto
    ): Promise<{token: string}>{
        const token= await this.authService.login(loginDto);
        return { token };
    }

    @Post('profile')
    async login(
        @Body() loginDto: LoginDto
    ): Promise<{token: string}>{
        const token= await this.authService.login(loginDto);
        return { token };
    }
}
