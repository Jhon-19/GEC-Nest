import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.model';

export const FULLNAME_MIN_LENGTH = 2;
export const FULLNAME_MAX_LENGTH = 8;
export const PHONE_MIN_LENGTH = 7;
export const PHONE_MAX_LENGTH = 11;

@Schema({ versionKey: false, timestamps: true })
export class UserInfo {
  @Prop({
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  })
  user: User;

  @Prop({
    minlength: FULLNAME_MIN_LENGTH,
    maxlength: FULLNAME_MAX_LENGTH,
  })
  fullName: string;

  @Prop({
    minlength: PHONE_MIN_LENGTH,
    maxlength: PHONE_MAX_LENGTH,
  })
  phoneNumber: string;
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);

export type UserInfoDocument = UserInfo & mongoose.Document;
