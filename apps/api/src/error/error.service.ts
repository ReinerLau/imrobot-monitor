import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { DB, DBType } from '../global/providers/db.provider';
import { errors } from '@imrobot/schema';
import { CreateErrorDto } from './model/error.dto';
import { createReadStream, createWriteStream } from 'fs';
import {
  removeSync,
  ensureDirSync,
  ensureFileSync,
  readdirSync,
} from 'fs-extra';
import * as archiver from 'archiver';

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

  async export() {
    const exportedZip = 'exports/data.zip';
    removeSync('exports');
    ensureFileSync(exportedZip);
    const output = createWriteStream(exportedZip);
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(output);
    const files = readdirSync('uploads');
    files.forEach((fileName) => {
      const file = createReadStream(`uploads/${fileName}`);
      archive.append(file, { name: fileName });
    });
    await archive.finalize();

    const zip = createReadStream(exportedZip);
    return new StreamableFile(zip);
  }
}
