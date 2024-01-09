import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './shared/services/app-config.service';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AppConfigService);

  const { port } = configService.appConfig;

  await app.listen(port);

  return app;
}
