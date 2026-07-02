import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService

    ) { }

    async register(createUserDto: CreateUserDto) {

        //encrypt the user password here
        //using bcrypt
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.password = hashedPassword;

        const user = await this.usersService.createUser(createUserDto);
        return this.jwtService.sign({ id: user.id, email: user.email });  // Return the JWT token after successful registration
    }

    //Login method

     async login(loginDto: LoginDto) {
        const user =await this.usersService.findByEmail(loginDto.email);

        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        // if (!user) {
        //     throw new UnauthorizedException('Invalid credentials');
        // }
        return this.jwtService.sign({ id: user.id, email: user.email });  // Return the JWT token after successful login

    }

}
