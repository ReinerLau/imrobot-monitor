import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DB, DBType } from '../global/providers/db.provider';
import { behavior } from '../schema';
import { CreateBehaviorDto } from './model/behavior.dto';

@Injectable()
export class BehaviorService {
  constructor(@Inject(DB) private db: DBType) {}

  async create(dto: CreateBehaviorDto) {
    await this.db.insert(behavior).values(dto);
  }

  async findOne(time: number) {
    return await this.db.query.behavior.findFirst({
      where: eq(behavior.time, time),
    });
  }
}
