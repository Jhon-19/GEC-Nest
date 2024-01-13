import {
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DeleteFileDto } from './dto/delete-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import * as fs from 'node:fs/promises';
import { checkFolder, createFolder, renameFile } from '../utils/file.util';
import { join } from 'node:path';
import { STATIC_PATH } from 'src/constants/resources';

@Injectable()
export class FileService {
  private serviceUnavailableException = new ServiceUnavailableException(
    '请求无效',
  );
  private staticPath = STATIC_PATH;

  private getFolderPath(folder) {
    if (!checkFolder(folder)) {
      throw this.serviceUnavailableException;
    }
    return join(this.staticPath, folder);
  }

  async create(folder, files) {
    const folderPath = this.getFolderPath(folder);

    let existsFolder = await createFolder(folderPath);

    if (!existsFolder) {
      throw this.serviceUnavailableException;
    }
    files.forEach(async (file) => await this.createOne(folderPath, file));
    return `files in ${folder} is created.`;
  }

  async createOne(folderPath, file: EMFile) {
    const fileName = file.originalname;
    const fileData = file.buffer;

    const newFileName = renameFile(fileName);
    const filePath = join(folderPath, newFileName);

    try {
      await fs.writeFile(filePath, fileData);
    } catch (err) {
      throw new ServiceUnavailableException(err.message);
    }
  }

  async remove(deleteFileDto: DeleteFileDto) {
    const { folder, fileName, prefix } = deleteFileDto;
    const folderPath = this.getFolderPath(folder);
    const filePath = prefix
      ? join(folderPath, `${prefix}-${fileName}`)
      : join(folderPath, fileName);

    try {
      await fs.unlink(filePath);
    } catch (err) {
      throw new ServiceUnavailableException(err.message);
    }

    return `${fileName} in ${folder} is removed.`;
  }

  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }
}
