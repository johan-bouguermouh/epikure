import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: Role): Promise<Role> {
    const role = new Role();
    role.name = createRoleDto.name;
    return this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    console.log('findAll');
    return this.roleRepository.find();
  }

  async findByName(name: string): Promise<Role> {
    return this.roleRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  async seedRoles() {
    const existingRoles = await this.roleRepository.find();
    const existingRoleNames = existingRoles.map((role) => role.name);
    const roles = [
      { name: 'admin' },
      { name: 'user' },
      { name: 'super' },
      { name: 'farmer' },
    ];

    const rolesToInsert = roles.filter(
      (role) => !existingRoleNames.includes(role.name),
    );
    if (rolesToInsert.length === 0) {
      console.log('No new roles to seed');
      return;
    }

    for (const role of rolesToInsert) {
      const roleEntity = this.roleRepository.create(role);
      await this.roleRepository.save(roleEntity);
    }

    console.log('Roles seeded');
  }
}
