import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { isNil } from 'lodash';

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
    const cluster = this.get('db.cluster');
    const encodedPassword = encodeURIComponent(password);
    const uri = `mongodb+srv://${username}:${encodedPassword}@${cluster}.k4wtyju.mongodb.net/?retryWrites=true&w=majority`;

    return { username, password, cluster, uri };
  }

  get jwtConfig(): JwtModuleOptions & { expires?: number } {
    return {
      secret: this.get('jwt.secret'),
      signOptions: {
        expiresIn: '5m',
      },
    };
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
