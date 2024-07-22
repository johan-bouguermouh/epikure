import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MinioClientService } from './minio-client/services/minioClient.service';
import { BufferedFile } from './minio-client/interfaces/bufferedFile.interface';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    public minioClientService: MinioClientService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('file not found', HttpStatus.BAD_REQUEST);
    } else if (
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpeg'
    ) {
      throw new HttpException(
        'file type not supported',
        HttpStatus.BAD_REQUEST,
      );
    }

    const fileForS3: BufferedFile = {
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      size: file.size,
      buffer: file.buffer,
    };

    const bucketName: string = process.env.MINIO_BUCKET_NAME;

    return this.minioClientService.upload(fileForS3, bucketName);
  }
}
