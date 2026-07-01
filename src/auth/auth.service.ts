import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    async register(createUserDto: CreateUserDto)  {

        //encrypt the user password here
        //using bcrypt
        const hashedPassword = await bcrypt.hash(createUserDto.password,10);

        //save user to database
        return createUserDto;
    }
}
