import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { isEmail } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async validateUser(usernameOrEmail: string, password: string) {
    let filter;
    if (isEmail(usernameOrEmail)) {
      filter = { email: usernameOrEmail };
    } else {
      filter = { username: usernameOrEmail };
    }
    const user = await this.userService.findUser(filter);

    if (!user) {
      return null;
    }

    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
      return null;
    }

    return user;
  }
}
