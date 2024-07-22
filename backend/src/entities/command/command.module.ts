import { Module } from '@nestjs/common';
import { CommandService } from './command.service';
import { CommandController } from './command.controller';
import { commandProviders } from './command.provider';
import { DatabaseModule } from 'src/database/database.module';
import { productProviders } from '../product/product.provider';
import { farmerProviders } from '../farmer/farmer.provider';
import { commandProductProviders } from '../command-product/command-product.provider';
import { placeProvider } from '../place/place.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...commandProviders,
    CommandService,
    ...productProviders,
    ...farmerProviders,
    ...commandProductProviders,
    ...placeProvider,
  ],
  controllers: [CommandController],
  exports: [CommandService],
})
export class CommandModule {}
