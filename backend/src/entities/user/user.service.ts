// Création du service User
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../roles/role.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.isActive = createUserDto.isActive;
    user.isFarmer = createUserDto.isFarmer;
    user.role = await this.roleRepository.findOne({
      where: { id: createUserDto.role },
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    console.log('findAll');
    return this.userRepository.find();
  }
}
