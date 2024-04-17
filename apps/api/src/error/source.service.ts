import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { ensureDirSync, removeSync } from 'fs-extra';
import * as path from 'path';

export const uploadPath = 'uploads';

export function ensureUploadPath() {
  ensureDirSync(uploadPath);
}

@Injectable()
export class SourceService {
  findMap(fileName: string) {
    if (process.env.NODE_ENV === 'dev') {
      const filePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'examples',
        'test-example',
        fileName.match(/\/src([^?]+)/)[0],
      );
      const file = createReadStream(filePath);
      return new StreamableFile(file);
    } else {
      const file = createReadStream(`uploads/${fileName}.map`);
      return new StreamableFile(file);
    }
  }

  clearMap() {
    removeSync(uploadPath);
  }
}
