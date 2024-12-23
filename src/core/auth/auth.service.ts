import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
      private readonly _userService: UserService,
      private readonly _jwtAuthService: JwtService,
    ) {}

    async login(dto: LoginAuthDto): Promise<any> {
      const { email, password } = dto;
      const userFinded = await this._userService.findByEmail(email);
  
      if (!userFinded)
        throw new NotFoundException({ email: "User not found" });
               
      const payload = {
        id: userFinded.id,
        name: userFinded.name,
      };

      delete userFinded.password;

      const token = this._jwtAuthService.sign(payload);

      return {
        user: userFinded,      
        token,
      }
    }


}
