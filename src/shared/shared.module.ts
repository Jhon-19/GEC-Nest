import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './services/app-config.service';
import { JwtModule } from '@nestjs/jwt';

const providers = [AppConfigService];

@Global()
@Module({
  providers,
  imports: [
    JwtModule.registerAsync({
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => configService.jwtConfig,
    }),
  ],
  exports: [...providers, JwtModule],
})
export class SharedModule {}
