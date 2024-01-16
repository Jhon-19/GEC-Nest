import { TransformInterceptor } from './interceptors/transform.interceptor';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './shared/services/app-config.service';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { AuthPlusGuard } from './guards/auth.guard';
import { SharedModule } from './shared/shared.module';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from './modules/role/role.service';
import { createStaticFolder } from './modules/resource/utils/folder.util';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AppConfigService);

  const reflector = app.get(Reflector);

  // app.useGlobalFilters(new BaseExceptionFilter(configService));

  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  const jwtService = app.select(SharedModule).get(JwtService);
  const roleService = app.select(SharedModule).get(RoleService);

  app.useGlobalGuards(new AuthPlusGuard(reflector, jwtService, roleService));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors) =>
        new UnprocessableEntityException(
          errors.map((e) => {
            const rule = Object.keys(e.constraints)[0];
            const msg = e.constraints[rule];
            return `property ${e.property} validation failed: ${msg}, following constraints: ${rule}`;
          })[0],
        ),
    }),
  );

  await createStaticFolder();

  const { port } = configService.appConfig;

  await app.listen(port);

  return app;
}
