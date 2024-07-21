//Création du controller user
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { bodyCreateUserDto, CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/role.entity';

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
      role:
        bodyCreateUserDto.isFarmer === true && !bodyCreateUserDto.guestUuid
          ? 2
          : 1,
    };

    return this.userService.create(createUserDto, bodyCreateUserDto.guestUuid);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('/role')
  async addRole(@Body() body: { name: string }): Promise<Role> {
    return this.userService.insertRole(body.name);
  }

  @Get('/role')
  async getRoles(): Promise<Role[]> {
    return this.userService.getRoles();
  }
}
