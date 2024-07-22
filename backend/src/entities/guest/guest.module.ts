import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { guestProviders } from './guest.provider';
import { DatabaseModule } from 'src/database/database.module';
import { farmerProviders } from '../farmer/farmer.provider';
import { placeProvider } from '../place/place.provider';
import { productProviders } from '../product/product.provider';
import { userProviders } from '../user/user.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...guestProviders,
    GuestService,
    ...farmerProviders,
    ...placeProvider,
    ...productProviders,
    ...userProviders,
  ],
  controllers: [GuestController],
  exports: [GuestService],
})
export class GuestModule {}
