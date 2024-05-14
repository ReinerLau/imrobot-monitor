import { Inject, Injectable } from '@nestjs/common';
import { and, asc, eq, gte, lte } from 'drizzle-orm';
import { DB, DBType } from '../global/providers/db.provider';
import { fullSnapshot, screen } from '../schema';
import { CreateFullSnapshotDto, CreateScreenDto } from './model/screen.dto';

@Injectable()
export class ScreenService {
  constructor(@Inject(DB) private db: DBType) {}

  async createOne(dto: CreateScreenDto) {
    if (dto.hash) {
      await this.createFull({
        hash: dto.hash,
        data: dto.data,
        timestamp: dto.timestamp,
      });
      await this.db.insert(screen).values({
        type: dto.type,
        data: dto.hash,
        timestamp: dto.timestamp,
      });
    } else {
      await this.db.insert(screen).values(dto);
    }
  }

  async findOne(startTime: number, endTime: number) {
    const data = await this.db.query.screen.findMany({
      where: and(
        gte(screen.timestamp, startTime),
        lte(screen.timestamp, endTime),
      ),
      orderBy: [asc(screen.timestamp)],
    });

    const full = data.filter((item) => item.type === 2);
    const promises = full.map((item) => {
      return new Promise(async (resolve) => {
        const full = await this.db.query.fullSnapshot.findFirst({
          where: eq(fullSnapshot.hash, item.data),
        });
        item.data = full.data as string;
        resolve(true);
      });
    });
    await Promise.all(promises);

    return data;
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
