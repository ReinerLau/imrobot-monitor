import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { DB, DBType } from '../global/providers/db.provider';
import { errors } from '@imrobot/schema';
import { CreateErrorDto } from './model/error.dto';
import { createReadStream } from 'fs';
import { removeSync, ensureDirSync } from 'fs-extra';

export const uploadPath = 'uploads';

export function ensureUploadPath() {
  ensureDirSync(uploadPath);
}

@Injectable()
export class ErrorService {
  constructor(@Inject(DB) private db: DBType) {}
  async findAll() {
    const result = await this.db
      .select({
        id: errors.id,
        message: errors.message,
        fileName: errors.fileName,
        lineNumber: errors.lineNumber,
        columnNumber: errors.columnNumber,
      })
      .from(errors);
    return result;
  }

  async createOne(dto: CreateErrorDto) {
    await this.db.insert(errors).values(dto);
  }

  findMap(fileName: string) {
    const file = createReadStream(`uploads/${fileName}.map`);
    return new StreamableFile(file);
  }

  clearMap() {
    removeSync(uploadPath);
  }
}
