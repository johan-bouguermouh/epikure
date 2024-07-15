import { Module } from '@nestjs/common';
import { userProviders } from './user.provider';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { roleProviders } from '../roles/role.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService, ...roleProviders],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
