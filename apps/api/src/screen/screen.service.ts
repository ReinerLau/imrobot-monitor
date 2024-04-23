import { screen } from '@imrobot/schema';
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DB, DBType } from '../global/providers/db.provider';
import { CreateScreenDto } from './model/screen.dto';

@Injectable()
export class ScreenService {
  constructor(@Inject(DB) private db: DBType) {}

  async createOne(dto: CreateScreenDto) {
    await this.db.insert(screen).values(dto);
  }

  async findOne(time: number) {
    return await this.db.query.screen.findFirst({
      where: eq(screen.time, time),
    });
  }
}
