import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isEmail } from 'class-validator';
import { Document } from 'mongoose';

export const USERNAME_MIN_LENGTH = 2;
export const USERNAME_MAX_LENGTH = 10;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({
    required: true,
    minlength: USERNAME_MIN_LENGTH,
    maxlength: USERNAME_MAX_LENGTH,
  })
  username: string;

  @Prop({
    required: true,
    validate: {
      validator: (input: string) => isEmail(input),
    },
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;
}

export const UserSchama = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
