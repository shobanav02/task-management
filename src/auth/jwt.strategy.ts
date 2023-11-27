import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { JwTPayload } from "./jwt-payload";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUsers } from "./user.model";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor( @InjectModel('User') private readonly usersModel: Model<IUsers>,
    private configService: ConfigService
        ) {
            super({
                secretOrKey: configService.get('JWT_SECRET'),
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
              });    
    }


    async validate(payload: JwTPayload): Promise<any> {
        const { username } = payload;
        const user = await this.usersModel.findOne({username})
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      }
}

