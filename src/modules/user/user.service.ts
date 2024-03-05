import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './models/user.model';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { filter } from 'rxjs';
import { IChangePasswordPayload } from './models/change-password.model';
import { UserInfo, UserInfoDocument } from './models/user-info.model';
import { ChangeUserInfoDto } from './dto/change-user-info.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(UserInfo.name)
    private readonly userInfoModel: Model<UserInfoDocument>,
  ) {}

  private async encryptPassword(password) {
    return await bcrypt.hash(password, 12);
  }

  public async createUser(dto: CreateUserDto) {
    const { username, email, password } = dto;
    const encrypted = await this.encryptPassword(password);
    const user = await this.userModel.create({
      username,
      email,
      password: encrypted,
    });
    const userInfo = await this.userInfoModel.create({ user: user._id });
    user.userInfo = userInfo._id;
    await user.save();
    return user;
  }

  public findUser(filter: FilterQuery<UserDocument>) {
    return this.userModel.findOne(filter).populate('userInfo').exec();
  }

  public async isExistUser(username: string, email: string) {
    const exist = await this.userModel
      .exists({ $or: [{ username }, { email }] })
      .exec();
    return !!exist;
  }

  public async resetPassword(dto: CreateUserDto) {
    const { username, email, password } = dto;
    const encrypted = await this.encryptPassword(password);
    const { modifiedCount } = await this.userModel
      .updateOne({ username, email }, { $set: { password: encrypted } })
      .exec();
    return !!modifiedCount;
  }

  public async changePassword(changePasswordPayload: IChangePasswordPayload) {
    const { id, oldPassword, newPassword } = changePasswordPayload;
    const newEncrypted = await this.encryptPassword(newPassword);
    const user = await this.userModel.findById(id).exec();

    const pass = await bcrypt.compare(oldPassword, user.password);

    if (pass) {
      user.password = newEncrypted;
      await user.save();
    }

    return pass;
  }

  public async changeUserInfo(dto: ChangeUserInfoDto) {
    const { id, fullName, phoneNumber } = dto;
    const userInfo = await this.getUserInfo(id);
    userInfo.fullName = fullName;
    userInfo.phoneNumber = phoneNumber;
    const newUserInfo = await userInfo.save();
    return !!newUserInfo;
  }

  public async getUserInfo(userId: string) {
    return this.userInfoModel.findOne({ user: userId }).exec();
  }
}
