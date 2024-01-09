import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './models/user.model';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public async createUser(dto: CreateUserDto) {
    const { username, email, password } = dto;
    const encrypted = await bcrypt.hash(password, 12);
    return this.userModel.create({ username, email, password: encrypted });
  }

  public findUser(filter: FilterQuery<UserDocument>) {
    return this.userModel.findOne(filter).exec();
  }

  public async isExistUser(username: string, email: string) {
    const exist = await this.userModel
      .exists({ $or: [{ username }, { email }] })
      .exec();
    return !!exist;
  }
}
