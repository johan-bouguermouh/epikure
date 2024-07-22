import { Module } from '@nestjs/common';
import { CommandProductService } from './command-product.service';
import { commandProductProviders } from './command-product.provider';
import { DatabaseModule } from 'src/database/database.module';
import { commandProviders } from 'src/entities/command/command.provider';
import { productProviders } from 'src/entities/product/product.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...commandProductProviders,
    CommandProductService,
    ...commandProviders,
    ...productProviders,
  ],
  exports: [CommandProductService],
})
export class CommandProductModule {}
