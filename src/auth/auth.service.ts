import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsers } from './user.model';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwTPayload } from './jwt-payload';
@Injectable()
export class AuthService {
    constructor (
        @InjectModel('User') private readonly usersModel: Model<IUsers>,
        private jwtService: JwtService
      ) {}
    
    
        async signUp(createUserDto: CreateUserDto) {
            const { username, password} = createUserDto;
            const hash = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, hash);

            try {

               const createdUser = new this.usersModel({ username , password: hashPassword});
               const result = await createdUser.save();
               return result;
            } catch (error) {
                if ( error.code === 11000) {
                    throw new ConflictException('Username already exists')
                }
                 throw new InternalServerErrorException();
            }
        }

        async signIn(createUserDto : CreateUserDto) {
            try {
               const {username , password} = createUserDto;
               const user = await this.usersModel.findOne({username});

               const pw = await bcrypt.compare(password, user.password);
               if (user && pw) {
                  const payload:JwTPayload = {username};
                  const accessToken : string = await this.jwtService.sign(payload);

                  return {
                    accessToken
                  };
               } else {
                 throw new UnauthorizedException('Password or user name does not match ');
               }
            } catch( error) {
               throw error;
            }
        }
}
