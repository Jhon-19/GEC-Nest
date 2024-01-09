import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';
import { merge } from 'lodash';

const YAML_CONFIG_FILENAME = 'bootstrap';
const YAML_CONFIG_SUFFIX = 'yaml';

export default () => {
  const cwd = process.cwd();
  let config: Record<string, any> = null;

  //load config.yaml
  const commonConfigPath = join(
    cwd,
    `${YAML_CONFIG_FILENAME}.${YAML_CONFIG_SUFFIX}`,
  );

  if (existsSync(commonConfigPath)) {
    config = yaml.load(readFileSync(commonConfigPath, 'utf8'));
  }

  // load config-${NODE_ENV}.yaml, like config-dev.yaml
  const envConfigPath = join(
    cwd,
    `${YAML_CONFIG_FILENAME}-${process.env.NODE_ENV}.${YAML_CONFIG_SUFFIX}`,
  );
  if (existsSync(envConfigPath)) {
    merge(config, yaml.load(readFileSync(envConfigPath, 'utf8')));
  }

  return config;
};
