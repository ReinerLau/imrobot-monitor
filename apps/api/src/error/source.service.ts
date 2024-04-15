import { Injectable, StreamableFile } from '@nestjs/common';
import * as archiver from 'archiver';
import { createReadStream, createWriteStream } from 'fs';
import {
  ensureDirSync,
  ensureFileSync,
  readdirSync,
  removeSync,
} from 'fs-extra';
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
        fileName.match(/\/src(.*)/)[0],
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
