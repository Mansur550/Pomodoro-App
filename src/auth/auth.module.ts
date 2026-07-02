import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule global
      envFilePath: '.env', // Specify the path to your .env file
    }),
    UsersModule,
    
    JwtModule.registerAsync({
        imports: [ConfigModule]
    })
  ],

  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
