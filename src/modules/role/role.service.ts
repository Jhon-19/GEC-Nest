import { Inject, Injectable } from '@nestjs/common';
import { Enforcer } from 'casbin';
import { CASBIN_ENFORCER } from 'src/constants/casbin';
import { RoleAction } from './types/action.type';

@Injectable()
export class RoleService {
  constructor(
    @Inject(CASBIN_ENFORCER)
    private readonly enforcer: Enforcer,
  ) {}

  public checkPermission(subject: string, object: string, action: RoleAction) {
    return this.enforcer.enforce(subject, object, action);
  }

  public mappingAction(method: string) {
    const table: Record<string, RoleAction> = {
      GET: RoleAction.READ,
      POST: RoleAction.CREATE,
      PUT: RoleAction.UPDATE,
      PATCH: RoleAction.UPDATE,
      DELETE: RoleAction.DELETE,
    };

    return table[method.toUpperCase()];
  }
}
