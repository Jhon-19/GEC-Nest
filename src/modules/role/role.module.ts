import { CASBIN_ENFORCER } from './../../constants/casbin';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { newEnforcer } from 'casbin';
import { AppConfigService } from 'src/shared/services/app-config.service';

@Module({
  providers: [
    RoleService,
    {
      provide: CASBIN_ENFORCER,
      useFactory: (appConfigService: AppConfigService) => {
        const { modelPath, policyAdapter } = appConfigService.casbinConfig;
        return newEnforcer(modelPath, policyAdapter);
      },
      inject: [AppConfigService],
    },
  ],
  exports: [RoleService],
})
export class RoleModule {}
