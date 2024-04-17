import * as schema from '@imrobot/schema';
import { Inject, Injectable } from '@nestjs/common';
import { desc, eq } from 'drizzle-orm';
import { DB, DBType } from '../global/providers/db.provider';
import { CreateScreenDto } from './model/screen.dto';

@Injectable()
export class ScreenService {
  constructor(@Inject(DB) private db: DBType) {}
  async findFirst() {
    return await this.db.query.screen.findFirst({
      orderBy: [desc(schema.screen.id)],
    });
  }

  async createOne(dto: CreateScreenDto) {
    await this.db.insert(schema.screen).values(dto);

    const newScreen = await this.findFirst();
    const newEntry = await this.db.query[dto.errorType].findFirst({
      orderBy: [desc(schema[dto.errorType].id)],
    });
    await this.db
      .update(schema[dto.errorType])
      .set({ screenId: newScreen.id })
      .where(eq(schema[dto.errorType].id, newEntry.id));
  }

  async findOne(id: number) {
    return await this.db.query.screen.findFirst({
      where: eq(schema.screen.id, id),
    });
  }
}
