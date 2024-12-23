import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcryptjs from "bcryptjs";
import { Repository } from 'typeorm';
import { RegisterResponse } from 'src/core/auth/responses/auth.responses';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}


  async create({ email, password, name }: CreateUserDto): Promise<RegisterResponse> {
    const user = await this.findByEmail(email);
  
    if (user)
      throw new BadRequestException("Email already exists");
    

    const hashedPassword = await bcryptjs.hash(password, 10);

    await this._userRepository.save({
      name,
      email,
      password: hashedPassword,
    });

    return {
      message: "User created successfully",
    };
    
  }

  async findAll() {
    return await this._userRepository.find();
  }

  async findByEmail(email: string) {
    return await this._userRepository.findOne({ 
      where: { 
        email 
      }
    });
  }

  async findOne(id: number) {
    return await this._userRepository.findOne({ 
      where: { 
        id 
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  delete(id: number) {
    return `This action removes a #${id} user`;
  }
}
