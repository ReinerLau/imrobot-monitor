import * as schema from '@imrobot/schema';
import { Inject, Injectable } from '@nestjs/common';
import { desc, eq } from 'drizzle-orm';
import { DB, DBType } from '../global/providers/db.provider';
import { CreateBehaviorDto } from './model/behavior.dto';

@Injectable()
export class BehaviorService {
  constructor(@Inject(DB) private db: DBType) {}
  async findFirst() {
    return await this.db.query.behavior.findFirst({
      orderBy: [desc(schema.behavior.id)],
    });
  }

  async createOne(dto: CreateBehaviorDto) {
    await this.db.insert(schema.behavior).values(dto);

    const newBehavior = await this.findFirst();
    const newEntry = await this.db.query[dto.errorType].findFirst({
      orderBy: [desc(schema[dto.errorType].id)],
    });
    await this.db
      .update(schema[dto.errorType])
      .set({ behaviorId: newBehavior.id })
      .where(eq(schema[dto.errorType].id, newEntry.id));
  }

  async findOne(id: number) {
    return await this.db.query.behavior.findFirst({
      where: eq(schema.behavior.id, id),
    });
  }
}
