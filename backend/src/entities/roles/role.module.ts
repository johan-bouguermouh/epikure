import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { roleProviders } from './role.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...roleProviders, RoleService],
  exports: [RoleService],
  //on intégère à l'initialisation de l'entité role déjà les rôles par défaut
})
export class RoleModule {}
