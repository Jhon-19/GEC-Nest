import { SKIP_TRANSFORM_DECORATOR_KEY } from '../decorators/skip-transform.decorator';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import {
  RESPONSE_SUCCESS_CODE,
  RESPONSE_SUCCESS_MSG,
} from 'src/constants/response';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // check transform
        const isSkipTransform = this.reflector.getAllAndOverride<boolean>(
          SKIP_TRANSFORM_DECORATOR_KEY,
          [context.getHandler(), context.getClass()],
        );

        if (isSkipTransform) {
          return data;
        } else {
          return {
            data,
            code: RESPONSE_SUCCESS_CODE,
            msg: RESPONSE_SUCCESS_MSG,
          };
        }
      }),
    );
  }
}
