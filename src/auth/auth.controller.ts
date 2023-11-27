import { Controller ,Body, Post  , UseGuards ,UploadedFile, Query, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    async createUser(@Body() createUserDto: CreateUserDto) {
      return this.authService.signUp(createUserDto);
    }

    @Post('/signin')
    async signIn(@Body() createUserDto: CreateUserDto) {
        return this.authService.signIn(createUserDto);
      }
}
