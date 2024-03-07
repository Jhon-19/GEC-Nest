import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../types/role.type';

export class ChangeUserRoleDto {
  @IsString()
  @IsOptional()
  adminId: string;

  @IsString()
  id: string;

  @IsEnum(Role)
  role: Role;
}
