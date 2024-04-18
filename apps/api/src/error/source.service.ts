import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import * as path from 'path';

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
        fileName,
      );
      const file = createReadStream(filePath);
      return new StreamableFile(file);
    } else {
      const file = createReadStream(`uploads/${fileName}.map`);
      return new StreamableFile(file);
    }
  }
}
