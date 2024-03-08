import { ChangeUserRoleDto } from './dto/change-user-role.dto';
import { ChangeUserInfoDto } from './dto/change-user-info.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SkipAuth } from 'src/decorators/skip-auth.decorator';
import { IChangePasswordPayload } from './models/change-password.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SkipAuth()
  @Post('reset-password')
  async resetPassword(@Body() dto: CreateUserDto) {
    return await this.userService.resetPassword(dto);
  }

  @Get('check-auth')
  checkAuth() {
    return true;
  }

  @Post('change-password')
  async changePassword(@Body() changePasswordPayload: IChangePasswordPayload) {
    return await this.userService.changePassword(changePasswordPayload);
  }

  @Post('user-info')
  async changeUserInfo(@Body() dto: ChangeUserInfoDto) {
    return await this.userService.changeUserInfo(dto);
  }

  @Get('user-info')
  async getUserInfo(@Query('id') userId: string) {
    return await this.userService.getUserInfo(userId);
  }

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Post('role-manage')
  async changeUserRole(@Body() changeUserRole: ChangeUserRoleDto) {
    return await this.userService.changeUserRole(changeUserRole);
  }
}
