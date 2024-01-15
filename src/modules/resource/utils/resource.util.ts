import { FILE } from 'node:dns';
import { FileOrFolder } from '../types/file.type';
import * as fs from 'node:fs/promises';
import { FOLDER } from 'src/constants/resources';

export async function existsFileOrFolder(
  path: string,
  type: FileOrFolder,
): Promise<boolean> {
  let isExist = false;
  try {
    let stat = await fs.stat(path);
    if (type === FILE && stat.isFile()) {
      isExist = true;
    } else if (type === FOLDER && stat.isDirectory()) {
      isExist = true;
    }
  } catch (err) {
    isExist = false;
  }
  return isExist;
}
