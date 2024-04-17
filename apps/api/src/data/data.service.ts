import * as schema from '@imrobot/schema';
import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import * as archiver from 'archiver';
import { desc } from 'drizzle-orm';
import {
  createReadStream,
  createWriteStream,
  ensureFileSync,
  readdirSync,
  removeSync,
} from 'fs-extra';
import { DB, DBType } from '../global/providers/db.provider';

@Injectable()
export class DataService {
  constructor(@Inject(DB) private db: DBType) {}
  async export() {
    const exportedZip = 'exports/data.zip';
    removeSync('exports');
    ensureFileSync(exportedZip);
    const output = createWriteStream(exportedZip);
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(output);

    this.appendSourceMap(archive);
    await this.appendTableData(archive);

    await archive.finalize();

    const zip = createReadStream(exportedZip);
    return new StreamableFile(zip);
  }

  appendSourceMap(archive: archiver.Archiver) {
    const files = readdirSync('uploads');
    files.forEach((fileName) => {
      const file = createReadStream(`uploads/${fileName}`);
      archive.append(file, { name: fileName });
    });
  }

  async appendTableData(archive: archiver.Archiver) {
    const tables = ['code', 'resource', 'request', 'behavior', 'screen'];
    const promiseList = tables.map((table) => {
      return this.db.query[table].findMany({
        orderBy: [desc(schema[table].id)],
      });
    });
    const results = await Promise.all(promiseList);
    results.forEach((result, index) => {
      archive.append(JSON.stringify(result), { name: `${tables[index]}.json` });
    });
  }
}
