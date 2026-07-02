import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService

    ) {}

    async register(createUserDto: CreateUserDto)  {

        //encrypt the user password here
        //using bcrypt
        const hashedPassword = await bcrypt.hash(createUserDto.password,10);
        createUserDto.password = hashedPassword;

        const user = await this.usersService.createUser(createUserDto);
        return this.jwtService.sign({id: user.id, email: user.email});  // Return the JWT token after successful registration
    }
        
}
