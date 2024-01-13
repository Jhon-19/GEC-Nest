import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { FileModule } from './file/file.module';
import { FolderModule } from './folder/folder.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'resource',
        children: [FileModule, FolderModule],
      },
    ]),
    FileModule,
    FolderModule,
  ],
})
export class ResourceModule {}
