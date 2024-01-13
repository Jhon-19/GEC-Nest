import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class DeleteFileDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  folder;

  @IsString()
  @MinLength(1)
  fileName;

  @IsOptional()
  prefix;
}
