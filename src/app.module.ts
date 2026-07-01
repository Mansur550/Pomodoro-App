import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true, // make ConfigModule global
      envFilePath: '.env', // specify the path to your .env file
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
          // console.log('Database configuration:', {
          //   host: config.get<string>('DB_HOST'),
          //   port: config.get<number>('DB_PORT'),
          //   username: config.get<string>('DB_USERNAME'),
          //   password: config.get<string>('DB_PASSWORD'),
          //   database: config.get<string>('DB_NAME'),
          // }
          // )
        return{
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          synchronize: true, // set to false in production
          autoLoadEntities: true, // automatically load entities from the modules
  
        };
      
      },
  
      inject: [ConfigService]
    }),
    AuthModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
