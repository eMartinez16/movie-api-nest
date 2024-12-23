import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';


@Controller('auth')
export class AuthController {
    constructor(
      private readonly _authService: AuthService,
    ) {}

    @Post('register')
    signIn(@Body() registerDto: RegisterDto){
      return this._authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginAuthDto) {
      return this._authService.login(loginDto);
    }
}
