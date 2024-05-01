import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';

@Injectable()
export class SourceService {
  findMap(fileName: string) {
    const file = createReadStream(`uploads/${fileName}.map`);
    return new StreamableFile(file);
  }
}
