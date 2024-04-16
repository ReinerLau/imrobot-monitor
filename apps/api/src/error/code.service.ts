import { code } from '@imrobot/schema';
import { Inject, Injectable } from '@nestjs/common';
import { desc } from 'drizzle-orm';
import { DB, DBType } from '../global/providers/db.provider';
import { CreateCodeDto } from './model/error.dto';

@Injectable()
export class CodeService {
  constructor(@Inject(DB) private db: DBType) {}
  async findAll() {
    const result = await this.db.query.code.findMany({
      orderBy: [desc(code.id)],
    });
    return result;
  }

  async createOne(dto: CreateCodeDto) {
    await this.db.insert(code).values(dto);
  }
}
