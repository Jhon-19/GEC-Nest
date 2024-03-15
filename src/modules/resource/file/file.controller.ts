import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AppConfigService } from 'src/shared/services/app-config.service';
import { EMFile } from '../types/file.type';
import { FileDto } from './dto/file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly configService: AppConfigService,
  ) {}

  @Post(':folder')
  @UseInterceptors(FilesInterceptor('files'))
  create(
    @UploadedFiles() files: Array<EMFile>,
    @Param('folder') folder: string,
  ) {
    return this.fileService.create(folder, files);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  createDefault(@UploadedFiles() files: Array<EMFile>) {
    return this.create(files, this.configService.resourcesConfig.defaultFolder);
  }

  @Delete()
  remove(@Body() deleteFile: FileDto) {
    return this.fileService.remove(deleteFile);
  }

  @Get(':folder')
  findAllInFolder(@Param('folder') folder: string) {
    return this.fileService.findAllInFolder(folder);
  }

  @Get(':folder/download')
  async download(
    @Res() res: Response,
    @Param('folder') folder: string,
    @Query('fileName') fileName: string,
    @Query('prefix') prefix?: string,
  ) {
    const { filePath, originalFileName } = await this.fileService.download({
      folder,
      fileName,
      prefix,
    });
    res.download(filePath, originalFileName);
  }

  @Patch()
  update(@Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(updateFileDto);
  }
}
