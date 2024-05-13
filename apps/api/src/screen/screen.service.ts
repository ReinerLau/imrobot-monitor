import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DB, DBType } from '../global/providers/db.provider';
import { fullSnapshot, screen } from '../schema';
import { CreateFullSnapshotDto, CreateScreenDto } from './model/screen.dto';

@Injectable()
export class ScreenService {
  constructor(@Inject(DB) private db: DBType) {}

  async createOne(dto: CreateScreenDto) {
    await this.db.insert(screen).values(dto);
  }

  async findOne(time: number) {
    const increment = await this.db.query.screen.findFirst({
      where: eq(screen.time, time),
    });

    const full = await this.db.query.fullSnapshot.findFirst({
      where: eq(fullSnapshot.hash, increment.hash),
    });

    return {
      full: full.data,
      increment: increment.data,
    };
  }

  async hasFull(hash: string) {
    const full = await this.db.query.fullSnapshot.findFirst({
      where: eq(fullSnapshot.hash, hash),
    });
    return full ? true : false;
  }

  async createFull(dto: CreateFullSnapshotDto) {
    await this.db.insert(fullSnapshot).values(dto);
  }
}
