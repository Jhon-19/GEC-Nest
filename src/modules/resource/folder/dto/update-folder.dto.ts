import { IntersectionType } from '@nestjs/mapped-types';
import { FolderDto } from './folder.dto';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class NewFolderDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  newFolder;
}

export class UpdateFolderDto extends IntersectionType(
  FolderDto,
  NewFolderDto,
) {}
