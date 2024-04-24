import { Inject, Injectable } from '@nestjs/common';
import { and, desc, gte, lte } from 'drizzle-orm';
import { DB, DBType } from '../global/providers/db.provider';
import { resource } from '../schema';
import { CreateResourceDto } from './model/error.dto';

@Injectable()
export class ResourceService {
  constructor(@Inject(DB) private db: DBType) {}
  async findAll(startTime: number, endTime: number) {
    return await this.db
      .select()
      .from(resource)
      .orderBy(desc(resource.id))
      .where(and(gte(resource.time, startTime), lte(resource.time, endTime)));
  }

  async createOne(dto: CreateResourceDto) {
    await this.db.insert(resource).values(dto);
  }
}
