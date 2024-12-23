import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from "bcryptjs";
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse, RegisterResponse } from './responses/auth.responses';
import { RegisterDto } from './dto/register.dto';


@Injectable()
export class AuthService {
    constructor(
      private readonly _userService: UserService,
      private readonly _jwtAuthService: JwtService,
    ) {}

    async register({ email, name, password, role}: RegisterDto): Promise<RegisterResponse> {
        const user = await this._userService.findByEmail(email);
      
        if (user)
          throw new BadRequestException("Email already exists");
        
    
        const hashedPassword = await bcryptjs.hash(password, 10);


        await this._userService.create({
          name,
          email,
          password: hashedPassword,
          role
        });
    
        return {
          message: "User created successfully",
        };
        
      
    }
 
    async login(dto: LoginAuthDto): Promise<LoginResponse> {
      const { email, password } = dto;
      const userFinded = await this._userService.findByEmail(email);
  
      if (!userFinded)
        throw new UnauthorizedException("Invalid email");
               
      const isPasswordValid = await bcryptjs.compare(password, userFinded.password);

      if (!isPasswordValid)
        throw new UnauthorizedException("Invalid password");
      

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
