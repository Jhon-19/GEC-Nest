import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderDto } from './dto/folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { SkipAuth } from 'src/decorators/skip-auth.decorator';

@SkipAuth()
@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  create(@Body() createFolderDto: FolderDto) {
    return this.folderService.create(createFolderDto);
  }

  @Patch()
  update(@Body() updateFolderDto: UpdateFolderDto) {
    return this.folderService.update(updateFolderDto);
  }

  @Delete()
  remove(@Body() folderDto: FolderDto) {
    return this.folderService.remove(folderDto);
  }

  @Get()
  findAll() {
    return this.folderService.findAll();
  }
}
