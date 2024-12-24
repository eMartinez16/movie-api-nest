import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";
import { Role } from "src/core/enum/role.enum";

export class RegisterDto {
    @IsString()
    @MinLength(3)
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(8)
    @Transform(({ value }) => value.trim())
    password: string;


    @IsEnum(Role)
    role: Role;
}
