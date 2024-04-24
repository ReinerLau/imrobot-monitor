import { code } from '@imrobot/schema';
import { Inject, Injectable } from '@nestjs/common';
import { and, desc, gte, lte } from 'drizzle-orm';
import { DB, DBType } from '../global/providers/db.provider';
import { CreateCodeDto } from './model/error.dto';

@Injectable()
export class CodeService {
  constructor(@Inject(DB) private db: DBType) {}

  async findAll(startTime: number, endTime: number) {
    return await this.db
      .select()
      .from(code)
      .orderBy(desc(code.id))
      .where(and(gte(code.time, startTime), lte(code.time, endTime)));
  }

  async createOne(dto: CreateCodeDto) {
    await this.db.insert(code).values(dto);
  }
}
