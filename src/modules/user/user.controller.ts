import { Body, Controller, Post } from '@nestjs/common';
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

  @Post('change-password')
  async changePassword(@Body() changePasswordPayload: IChangePasswordPayload) {
    return await this.userService.changePassword(changePasswordPayload);
  }
}
