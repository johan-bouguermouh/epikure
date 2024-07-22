import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { placeProvider } from './place.provider';
import { DatabaseModule } from 'src/database/database.module';
import { farmerProviders } from '../farmer/farmer.provider';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [DatabaseModule, UploadModule],
  providers: [...placeProvider, PlaceService, ...farmerProviders],
  controllers: [PlaceController],
  exports: [PlaceService],
})
export class PlaceModule {}
