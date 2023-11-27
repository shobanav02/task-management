import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy :'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async ( configService: ConfigService) => ({
         secret:configService.get('JWT_SECRET'),
         signOptions : {
          expiresIn : 90
         }

      })
      // secret:'topSecret51',
      // signOptions : {
      //   expiresIn : 15
      // }
    }),
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserSchema
   }]),
  ],
  providers: [AuthService , JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
