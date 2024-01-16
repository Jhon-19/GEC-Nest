import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FileDto } from './dto/file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import * as fs from 'node:fs/promises';
import { parseOriginalFileName, renameFile } from '../utils/file.util';
import { join } from 'node:path';
import { FOLDER } from 'src/constants/resources';
import { FILE } from 'node:dns';
import { EMFile } from '../types/file.type';
import { checkFolder, getFolderPath } from '../utils/folder.util';
import { existsFileOrFolder } from '../utils/resource.util';

@Injectable()
export class FileService {
  private getFullFileName(fileName, prefix) {
    return prefix ? `${prefix}-${fileName}` : fileName;
  }

  private getFilePath(fileDto: FileDto) {
    const { folder, fileName, prefix } = fileDto;
    const folderPath = getFolderPath(folder);
    const fullFileName = this.getFullFileName(fileName, prefix);
    const filePath = join(folderPath, fullFileName);
    return { filePath, fullFileName };
  }

  private getRenamedFilePath(folderPath, fileName) {
    const fileNameRenamed = renameFile(fileName);
    const filePath = join(folderPath, fileNameRenamed);
    return filePath;
  }

  async create(folder: string, files: Array<EMFile>) {
    const folderPath = getFolderPath(folder);

    const isExist = await existsFileOrFolder(folderPath, FOLDER);

    if (!isExist) {
      throw new ServiceUnavailableException('文件夹不存在');
    }

    files.forEach(async (file) => await this.createOne(folderPath, file));
    return `${files.length} files in ${folder} is created.`;
  }

  async createOne(folderPath, file: EMFile) {
    const fileName = file.originalname;
    const fileData = file.buffer;

    const filePath = this.getRenamedFilePath(folderPath, fileName);

    try {
      await fs.writeFile(filePath, fileData);
    } catch (err) {
      throw new ServiceUnavailableException(err.message);
    }
  }

  async remove(fileDto: FileDto) {
    const { filePath } = this.getFilePath(fileDto);

    try {
      await fs.unlink(filePath);
    } catch (err) {
      throw new ServiceUnavailableException(err.message);
    }

    return `${fileDto.fileName} in ${fileDto.folder} is removed.`;
  }

  async findAllInFolder(folder: string) {
    const folderPath = getFolderPath(folder);
    let isExist = existsFileOrFolder(folderPath, FOLDER);
    let files = [];
    if (isExist) {
      try {
        files = await fs.readdir(folderPath);
      } catch (err) {
        throw new ServiceUnavailableException(err.message);
      }
    }
    return files;
  }

  async download(fileDto: FileDto) {
    const { filePath, fullFileName } = this.getFilePath(fileDto);
    let isExist = await existsFileOrFolder(filePath, FILE);
    if (!isExist) {
      throw new NotFoundException('文件不存在');
    }
    let originalFileName = parseOriginalFileName(fullFileName);
    return { filePath, originalFileName };
  }

  async update(updateFileDto: UpdateFileDto) {
    const { folder, fileName, prefix, newFolder, newFileName } = updateFileDto;
    const { filePath: oldFilePath, fullFileName } = this.getFilePath({
      folder,
      fileName,
      prefix,
    });
    const originalFileName = parseOriginalFileName(fullFileName);

    let newFolderPath = getFolderPath(folder);
    if (newFolder && checkFolder(newFolder)) {
      newFolderPath = getFolderPath(newFolder);
    }

    let newOriginalFileName = newFileName ?? originalFileName;
    let newFilePath = this.getRenamedFilePath(
      newFolderPath,
      newOriginalFileName,
    );

    try {
      await fs.rename(oldFilePath, newFilePath);
    } catch (err) {
      throw new ServiceUnavailableException(err.message);
    }

    return `${originalFileName} in ${folder} is moved to ${newOriginalFileName} in ${
      newFolder ?? folder
    }.`;
  }
}
