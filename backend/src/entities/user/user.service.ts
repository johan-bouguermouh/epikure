// Création du service User
import {
  Injectable,
  Inject,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../roles/role.entity';
import { Guest } from '../guest/guest.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
    @Inject('GUEST_REPOSITORY')
    private guestRepository: Repository<Guest>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    guestUuid?: string,
  ): Promise<User> {
    const guest = guestUuid
      ? await this.guestRepository.findOne({ where: { uuid: guestUuid } })
      : false;

    if (guest && createUserDto.isFarmer) {
      throw new NotAcceptableException(
        'Vous ne pouvez pas créer un utilisateur fermier pour un invité',
      );
    } else if (guest && guest.user !== null) {
      throw new UnauthorizedException(
        "L'enregistrement ne peut pas être effectué",
      );
    }

    const role: Role = createUserDto.isFarmer
      ? await this.roleRepository.findOne({ where: { name: 'FARMER' } })
      : await this.roleRepository.findOne({ where: { name: 'USER' } });

    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.isActive = createUserDto.isActive;
    user.isFarmer = createUserDto.isFarmer;
    user.role = role;
    const userSaved: User = await this.userRepository.save(user);

    if (!createUserDto.isFarmer && guest) {
      guest.user = userSaved;
      await this.guestRepository.save(guest);
    }

    return userSaved;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async insertRole(name: string): Promise<Role> {
    const role = new Role();
    role.name = name;
    return this.roleRepository.save(role);
  }

  async getRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }
}
