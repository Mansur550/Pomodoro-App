import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // Implement JWT strategy here
    constructor(private configService: ConfigService) {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        if(!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in the ConfigService');
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
        })
        
    }

async validate(payload: any) {
    // Here you can implement any additional validation logic if needed
    // For example, you can check if the user exists in the database
    return { userId: payload.id, email: payload.email }; // Return the user information to be attached to the request object
  }
}