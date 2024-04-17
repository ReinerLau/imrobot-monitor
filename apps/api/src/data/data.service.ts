import { Injectable, StreamableFile } from '@nestjs/common';
import * as archiver from 'archiver';
import {
  createReadStream,
  createWriteStream,
  ensureFileSync,
  readdirSync,
  removeSync,
} from 'fs-extra';

@Injectable()
export class DataService {
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
