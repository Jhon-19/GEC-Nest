import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileService } from './file.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SkipAuth } from 'src/decorators/skip-auth.decorator';
import { AppConfigService } from 'src/shared/services/app-config.service';
import { DeleteFileDto } from './dto/delete-file.dto';

@SkipAuth()
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly configService: AppConfigService,
  ) {}

  @Post(':folder')
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @UploadedFiles() files: Array<EMFile>,
    @Param('folder') folder: string,
  ) {
    return await this.fileService.create(folder, files);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async createDefault(@UploadedFiles() files: Array<EMFile>) {
    return await this.create(
      files,
      this.configService.resourcesConfig.defaultFolder,
    );
  }

  @Delete()
  remove(@Body() deleteFile: DeleteFileDto) {
    return this.fileService.remove(deleteFile);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }
}
