import { RoleService } from './../../modules/role/role.service';
import { SKIP_AUTH_DECORATOR_KEY } from './../../decorators/skip-auth/skip-auth.decorator';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'class-validator';
import { Request } from 'express';
import { IUserPayload } from 'src/modules/auth/models/payload.model';

@Injectable()
export class AuthPlusGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // the @SkipAuth() decorator is applied to skip authentication
    const isSkipAuth = this.reflector.getAllAndOverride<boolean>(
      SKIP_AUTH_DECORATOR_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isSkipAuth) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    // check the token
    const token = request.headers['authorization']
      ?.replace('Bearer', '')
      .trim();
    if (isEmpty(token)) {
      throw new UnauthorizedException();
    }

    try {
      request.user = this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException();
    }

    // check the jwt payload
    if (isEmpty(request.user)) {
      throw new Error('jwt payload is invalid');
    }

    // check authorization
    const { user, method, path } = request;
    const { role } = user as IUserPayload;
    const action = this.roleService.mappingAction(method);
    return this.roleService.checkPermission(role, path, action);
  }
}
