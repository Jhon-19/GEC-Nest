import { UnitType } from '../types/unit.type';
import { MimeType } from '../types/mime.type';

export function renameFile(fileName): string {
  return `${Math.round(Math.random() * 1e6)}-${fileName}`;
}

export function parseOriginalFileName(fileName: string): string {
  const pattern = /\d+-(.*)/;
  let originalFileName = fileName.match(pattern)[1];
  return originalFileName;
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

export function decodeFileName(fileOriginalName) {
  return Buffer.from(fileOriginalName, 'latin1').toString('utf-8');
}
