import { Inject, Injectable } from '@nestjs/common';
import { DB, DBType } from '../global/providers/db.provider';
import { code } from '@imrobot/schema';
import { CreateCodeDto } from './model/error.dto';

@Injectable()
export class CodeService {
  constructor(@Inject(DB) private db: DBType) {}
  async findAll() {
    const result = await this.db
      .select({
        id: code.id,
        message: code.message,
        url: code.url,
        fileName: code.fileName,
        lineNumber: code.lineNumber,
        columnNumber: code.columnNumber,
        time: code.time,
      })
      .from(code);
    return result;
  }

  async createOne(dto: CreateCodeDto) {
    await this.db.insert(code).values(dto);
  }
}
