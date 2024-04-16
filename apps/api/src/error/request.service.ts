import { request } from '@imrobot/schema';
import { Inject, Injectable } from '@nestjs/common';
import { desc } from 'drizzle-orm';
import { DB, DBType } from '../global/providers/db.provider';
import { CreateRequestDto } from './model/error.dto';

@Injectable()
export class RequestService {
  constructor(@Inject(DB) private db: DBType) {}
  async findAll() {
    const result = await this.db.query.request.findMany({
      orderBy: [desc(request.id)],
    });
    return result;
  }

  async createOne(dto: CreateRequestDto) {
    await this.db.insert(request).values(dto);
  }
}
