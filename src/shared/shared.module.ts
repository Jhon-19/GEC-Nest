import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './services/app-config.service';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from 'src/modules/role/role.module';

const providers = [AppConfigService];

@Global()
@Module({
  providers,
  imports: [
    JwtModule.registerAsync({
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => configService.jwtConfig,
    }),
    RoleModule,
  ],
  exports: [...providers, JwtModule, RoleModule],
})
export class SharedModule {}
