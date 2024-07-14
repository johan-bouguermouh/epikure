import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioModule } from 'nestjs-minio-client';
import { MinioClientService } from './services/minioClient.service';

@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const endPoint = configService.get<string>('MINIO_ENDPOINT');
        const port = parseInt(configService.get<string>('MINIO_PORT'), 10);
        const useSSL = configService.get<string>('MINIO_USE_SSL') === 'true';
        const accessKey = configService.get<string>('MINIO_ACCESS_KEY');
        const secretKey = configService.get<string>('MINIO_SECRET_KEY');

        Logger.log(`Minio Config: endPoint=${endPoint}, port=${port}, useSSL=${useSSL}, accessKey=${accessKey}`);

        return {
          endPoint,
          port,
          useSSL,
          accessKey,
          secretKey,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
