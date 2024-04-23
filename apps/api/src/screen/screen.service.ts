import { screen } from '@imrobot/schema';
import { Inject, Injectable } from '@nestjs/common';
import { desc, eq } from 'drizzle-orm';
import { DB, DBType } from '../global/providers/db.provider';
import { CreateScreenDto } from './model/screen.dto';

@Injectable()
export class ScreenService {
  constructor(@Inject(DB) private db: DBType) {}
  async findFirst() {
    return await this.db.query.screen.findFirst({
      orderBy: [desc(screen.id)],
    });
  }

  async createOne(dto: CreateScreenDto) {
    await this.db.insert(screen).values(dto);

    // const newScreen = await this.findFirst();
    // const newEntry = await this.db.query.app.findFirst({
    //   orderBy: [desc(app.id)],
    // });
    // await this.db
    //   .update(app)
    //   .set({ screenId: newScreen.id })
    //   .where(eq(app.id, newEntry.id));
  }

  async findOne(id: number) {
    return await this.db.query.screen.findFirst({
      where: eq(screen.id, id),
    });
  }
}
