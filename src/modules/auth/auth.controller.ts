import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserService } from './../user/user.service';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IUserPayload } from './models/payload.model';
import { AuthGuard } from '@nestjs/passport';
import { UserPayload } from 'src/decorators/user-payload/user-payload.decorator';
import { AuthPlusGuard } from 'src/guards/auth/auth.guard';
import { SkipAuth } from 'src/decorators/skip-auth/skip-auth.decorator';

@SkipAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async singup(@Body() dto: CreateUserDto) {
    const { username, email } = dto;
    const isExist = await this.userService.isExistUser(username, email);

    if (isExist) {
      const message = 'The username or email already exists.';
      throw new BadRequestException(message);
    }

    const user = await this.userService.createUser(dto);
    const payload: IUserPayload = {
      id: user._id,
      username: user.username,
    };

    return this.jwtService.sign(payload);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  sigin(@UserPayload() user: IUserPayload) {
    return this.jwtService.sign(user);
  }
}
