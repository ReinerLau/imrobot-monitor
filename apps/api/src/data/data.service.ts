import * as schema from '@imrobot/schema';
import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import * as archiver from 'archiver';
import { desc } from 'drizzle-orm';
import {
  createReadStream,
  createWriteStream,
  ensureDirSync,
  ensureFileSync,
  readdirSync,
  readJSONSync,
  removeSync,
} from 'fs-extra';
import { DB, DBType } from '../global/providers/db.provider';

@Injectable()
export class DataService {
  constructor(@Inject(DB) private db: DBType) {}
  async export() {
    const exportedZip = 'exports/data.zip';
    removeSync(exportedZip);
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
    const uploadPath = 'uploads';
    ensureDirSync(uploadPath);
    const files = readdirSync(uploadPath);
    files.forEach((fileName) => {
      const file = createReadStream(`uploads/${fileName}`);
      archive.append(file, { name: fileName });
    });
  }

  async appendTableData(archive: archiver.Archiver) {
    const tables = ['app', 'code', 'resource', 'request', 'behavior', 'screen'];
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

  async upload(file: Express.Multer.File) {
    if (file.filename.includes('.json')) {
      const res = readJSONSync(file.path);
      const index = file.filename.indexOf('.json');
      const tableName = file.filename.slice(0, index);
      await this.db.insert(schema[tableName]).values(res);
      removeSync(file.path);
    }
  }
}
