import { Inject, Injectable } from '@nestjs/common';
import { and, desc, gte, lte } from 'drizzle-orm';
import { DB, DBType } from '../global/providers/db.provider';
import { request } from '../schema';
import { CreateRequestDto } from './model/error.dto';

@Injectable()
export class RequestService {
  constructor(@Inject(DB) private db: DBType) {}
  async findAll(startTime: number, endTime: number) {
    return await this.db
      .select()
      .from(request)
      .orderBy(desc(request.id))
      .where(and(gte(request.time, startTime), lte(request.time, endTime)));
  }

  async createOne(dto: CreateRequestDto) {
    await this.db.insert(request).values(dto);
  }
}
