import { IsString, MaxLength, MinLength } from 'class-validator';

export class FolderDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  folder;
}
