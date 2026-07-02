import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async createUser(data: User): Promise<User>{
        const newUser = this.userRepository.create(data);
        return await this.userRepository.save(newUser)
    }
    
}
