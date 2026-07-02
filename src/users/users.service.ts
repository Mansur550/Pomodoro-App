import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async createUser(data: CreateUserDto): Promise<User>{
        const newUser = this.userRepository.create(data);
        return await this.userRepository.save(newUser)
    }

    // Find user by email
    async findByEmail(email: string): Promise<any> {
    
        //Logic to find user by email
    }
    
}
