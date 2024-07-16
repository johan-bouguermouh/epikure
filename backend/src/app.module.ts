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
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, UploadService],
})
export class AppModule {}
