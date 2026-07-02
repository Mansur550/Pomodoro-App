import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService) {}

    async register(createUserDto: CreateUserDto)  {

        //encrypt the user password here
        //using bcrypt
        const hashedPassword = await bcrypt.hash(createUserDto.password,10);
        createUserDto.password = hashedPassword;

        return await this.usersService.createUser(createUserDto);
    }
        
}
