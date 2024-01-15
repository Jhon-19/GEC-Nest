import { MethodNotAllowedException } from '@nestjs/common';
import * as fs from 'node:fs/promises';
import { join } from 'node:path';
import { FOLDER, STATIC_PATH } from 'src/constants/resources';
import { existsFileOrFolder } from './resource.util';

export function checkFolder(folder: string): boolean {
  let isValid = false;
  if (folder.indexOf('/') === -1) {
    isValid = true;
  }
  return isValid;
}

export function getFolderPath(folder) {
  if (!checkFolder(folder)) {
    throw new MethodNotAllowedException('请求无效');
  }
  return join(STATIC_PATH, folder);
}

export async function createStaticFolder() {
  try {
    await createFolder(STATIC_PATH);
  } catch (err) {
    throw new MethodNotAllowedException(err.message);
  }
}

export async function createFolder(folderPath: string) {
  let isExist = await existsFileOrFolder(folderPath, FOLDER);
  if (!isExist) {
    try {
      await fs.mkdir(folderPath);
    } catch (err) {
      throw new MethodNotAllowedException(err.message);
    }
  }
}
