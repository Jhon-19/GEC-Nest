import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { isNil } from 'lodash';
import { join } from 'path';
import { ResourcesOptions } from 'src/modules/resource/models/option.model';
import { parseFileSize } from 'src/modules/resource/utils/file.util';
import { CasbinOptions } from 'src/modules/role/models/option.model';

@Injectable()
export class AppConfigService {
  private cwd = process.cwd();

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
        expiresIn: '3h',
      },
    };
  }

  get casbinConfig(): CasbinOptions {
    const basePath = this.get('casbin.basePath');
    const modelPath = join(this.cwd, basePath, this.get('casbin.modelPath'));
    const policyAdapter = join(
      this.cwd,
      basePath,
      this.get('casbin.policyAdapter'),
    );
    return { modelPath, policyAdapter };
  }

  get resourcesConfig(): ResourcesOptions {
    const defaultFolder = this.get('resources.defaultFolder');
    const fileSizeStr = this.get('resources.fileSize');
    const fileSize = parseFileSize(fileSizeStr);
    return { defaultFolder, fileSize };
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
