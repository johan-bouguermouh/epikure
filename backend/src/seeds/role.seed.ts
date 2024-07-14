import { DataSource } from 'typeorm';
import { Role } from '../entities/roles/role.entity';

export const seedRoles = async (dataSource: DataSource) => {
  try {
    const roleRepository = dataSource.getRepository(Role);
    const roles = [
      { name: 'admin' },
      { name: 'user' },
      { name: 'super' },
      { name: 'farmer' },
    ];

    for (const role of roles) {
      const roleEntity = roleRepository.create(role);
      await roleRepository.save(roleEntity);
    }
    console.log('Roles seeded');
  } catch (error) {
    console.error('Error seeding roles:', error);
  }
};
