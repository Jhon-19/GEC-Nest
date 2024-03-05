import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import {
  FULLNAME_MAX_LENGTH,
  FULLNAME_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  PHONE_MIN_LENGTH,
} from '../models/user-info.model';

export class ChangeUserInfoDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  @MinLength(FULLNAME_MIN_LENGTH)
  @MaxLength(FULLNAME_MAX_LENGTH)
  fullName: string;

  @IsString()
  @IsOptional()
  @MinLength(PHONE_MIN_LENGTH)
  @MaxLength(PHONE_MAX_LENGTH)
  phoneNumber: string;
}
