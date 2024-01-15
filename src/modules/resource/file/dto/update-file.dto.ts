import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { FileDto } from './file.dto';

export class NewFileDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  newFolder;

  @IsString()
  @MinLength(1)
  newFileName;
}

export class UpdateFileDto extends IntersectionType(
  FileDto,
  PartialType(NewFileDto),
) {}
