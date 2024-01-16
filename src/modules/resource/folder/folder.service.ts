import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { FolderDto } from './dto/folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import {
  checkFolder,
  createFolder,
  getAllFolders,
  getFolderPath,
} from '../utils/folder.util';
import { existsFileOrFolder } from '../utils/resource.util';
import { FOLDER } from 'src/constants/resources';
import * as fs from 'node:fs/promises';
import * as fse from 'fs-extra';

@Injectable()
export class FolderService {
  async create(folderDto: FolderDto) {
    const { folder } = folderDto;
    const folderPath = getFolderPath(folder);
    if (existsFileOrFolder(folderPath, FOLDER)) {
      throw new ServiceUnavailableException('文件夹已存在');
    }
    await createFolder(folderPath);
    return `${folder} is created`;
  }

  async update(updateFolderDto: UpdateFolderDto) {
    const { folder, newFolder } = updateFolderDto;
    const folderPath = getFolderPath(folder);
    const newFolderPath = getFolderPath(newFolder);
    const isValid =
      (await existsFileOrFolder(folderPath, FOLDER)) &&
      folder !== newFolder &&
      checkFolder(newFolder) &&
      !(await existsFileOrFolder(newFolderPath, FOLDER));
    if (isValid) {
      await fs.rename(folderPath, newFolderPath);
    } else {
      throw new ServiceUnavailableException('文件夹无效');
    }
    return `${folder} is renamed to ${newFolder}`;
  }

  async remove(folderDto: FolderDto) {
    const { folder } = folderDto;
    const folderPath = getFolderPath(folder);
    if (!existsFileOrFolder(folderPath, FOLDER)) {
      throw new ServiceUnavailableException('文件夹不存在');
    }
    await fse.remove(folderPath);
    return `${folder} is removed`;
  }

  async findAll() {
    return await getAllFolders();
  }
}
