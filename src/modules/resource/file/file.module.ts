import { Module, UnsupportedMediaTypeException } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { AppConfigService } from 'src/shared/services/app-config.service';
import { checkFileType } from '../utils/file.util';

@Module({
  imports: [
    MulterModule.registerAsync({
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        limits: { fileSize: configService.resourcesConfig.fileSize },
        fileFilter(req, file, callback) {
          if (checkFileType(file.mimetype)) {
            callback(null, true);
          } else {
            callback(new UnsupportedMediaTypeException('文件类型错误'), false);
          }
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
