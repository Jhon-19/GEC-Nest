import * as fs from 'node:fs/promises';
import { UnitType } from '../types/unit.type';
import { MimeType } from '../types/mime.type';
import { STATIC_PATH } from 'src/constants/resources';
import { MethodNotAllowedException } from '@nestjs/common';

export async function createStaticFolder() {
  try {
    await createFolder(STATIC_PATH);
  } catch (err) {
    throw new MethodNotAllowedException(err.message);
  }
}

export function renameFile(fileName): string {
  return `${Math.round(Math.random() * 1e6)}-${fileName}`;
}

export function checkFolder(folder: string): boolean {
  let isValid = false;
  if (folder.indexOf('/') === -1) {
    isValid = true;
  }
  return isValid;
}

export async function createFolder(folderPath: string): Promise<boolean> {
  let isCreated = false;
  try {
    let stat = await fs.stat(folderPath);
    if (stat.isDirectory()) {
      isCreated = true;
    }
  } catch (err) {
    await fs.mkdir(folderPath);
    isCreated = true;
  }
  return isCreated;
}

export function parseFileSize(fileSizeStr: string) {
  let reg = /\d+/;
  let size = fileSizeStr.match(reg)[0];
  let unit = fileSizeStr.replace(size, '').trim().toUpperCase()[0];
  return parseInt(size) * UnitType[unit];
}

export function checkFileType(mimetype: string) {
  const allowedMimeTypes = Object.values(MimeType);
  let isAllowed = false;
  if (allowedMimeTypes.includes(mimetype as MimeType)) {
    isAllowed = true;
  }
  return isAllowed;
}
