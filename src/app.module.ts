import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ResourceModule } from './modules/resource/resource.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import configuration from './configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from './shared/services/app-config.service';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        uri: configService.mongoDBConfig.uri,
      }),
    }),
    SharedModule,
    AuthModule,
    UserModule,
    ResourceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
