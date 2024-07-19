//Création du controller user
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { bodyCreateUserDto, CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() bodyCreateUserDto: bodyCreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(bodyCreateUserDto.password, 10);
    const createUserDto: CreateUserDto = {
      email: bodyCreateUserDto.email,
      password: hashedPassword,
      isActive: true,
      isFarmer: bodyCreateUserDto.isFarmer,
      role: bodyCreateUserDto.isFarmer === true ? 2 : 1,
    };

    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
