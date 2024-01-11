import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { isNil } from 'lodash';
import { join } from 'path';
import { CasbinOptions } from 'src/modules/role/models/option.model';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get nodeEnv(): string {
    return this.get('application.env');
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get appConfig() {
    return {
      port: this.get<number>('application.port'),
    };
  }

  get mongoDBConfig() {
    const username = this.get('db.username');
    const password = this.get('db.password');
    const encodedPassword = encodeURIComponent(password);
    const name = this.get('db.name');
    const uri = `mongodb://${username}:${encodedPassword}@127.0.0.1:27017/${name}`;

    return { username, password, uri };
  }

  get jwtConfig(): JwtModuleOptions {
    return {
      secret: this.get('jwt.secret'),
      signOptions: {
        expiresIn: '5m',
      },
    };
  }

  get casbinConfig(): CasbinOptions {
    const cwd = process.cwd();
    const modelPath = join(cwd, this.get('casbin.modelPath'));
    const policyAdapter = join(cwd, this.get('casbin.policyAdapter'));
    return { modelPath, policyAdapter };
  }

  /**
   * internal function
   */
  private get<T = string>(key: string): T {
    const value = this.configService.get<T>(key);

    if (isNil(value)) {
      throw new Error(key + 'environment virable does not set');
    }
    return value;
  }
}
