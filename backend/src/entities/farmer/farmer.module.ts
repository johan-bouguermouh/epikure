import { Module } from '@nestjs/common';
import { farmerProviders } from './farmer.provider';
import { FarmerService } from './farmer.services';
import { DatabaseModule } from 'src/database/database.module';
import { FarmerController } from './farmer.controller';
import { userProviders } from '../user/user.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...farmerProviders, FarmerService, ...userProviders],
  controllers: [FarmerController],
  exports: [FarmerService],
})
export class FarmerModule {}
