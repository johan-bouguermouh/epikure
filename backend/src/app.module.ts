import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinioClientModule } from './minio-client/minio-client.module';
import { UploadModule } from './upload/upload.module';
import { DatabaseModule } from './database/database.module';
import { UploadController } from './upload/controllers/upload.controller';
import { UploadService } from './upload/services/upload.service';
import { UserModule } from './entities/user/user.module';
import { RoleModule } from './entities/roles/role.module';
import { FarmerModule } from './entities/farmer/farmer.module';
import { CategoryProductModule } from './entities/category-product/category-prodyuct.module';
import { ProductModule } from './entities/product/product.module';
import { PlaceModule } from './entities/place/place.module';
import { CommandModule } from './entities/command/command.module';
import { CommandProductModule } from './entities/command-product/command-product.module';
import { GuestModule } from './entities/guest/guest.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MinioClientModule,
    UploadModule,
    DatabaseModule,
    UserModule,
    RoleModule,
    FarmerModule,
    CategoryProductModule,
    ProductModule,
    PlaceModule,
    CommandModule,
    CommandProductModule,
    GuestModule,
    AuthModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, UploadService],
})
export class AppModule {}
