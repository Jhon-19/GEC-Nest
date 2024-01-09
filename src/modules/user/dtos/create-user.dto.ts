import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from '../models/user.model';

export class CreateUserDto {
  @IsString()
  @MinLength(USERNAME_MIN_LENGTH)
  @MaxLength(USERNAME_MAX_LENGTH)
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
