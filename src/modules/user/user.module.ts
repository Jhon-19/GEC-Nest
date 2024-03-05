import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchama } from './models/user.model';
import { UserController } from './user.controller';
import { UserInfo, UserInfoSchema } from './models/user-info.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchama },
      { name: UserInfo.name, schema: UserInfoSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
