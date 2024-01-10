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

@Injectable()
export class AuthPlusGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
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
      const authUser = this.jwtService.verify(token);

      // check the jwt payload
      if (isEmpty(authUser)) {
        throw new Error('jwt payload is invalid');
      }
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
