import { resource } from '@imrobot/schema';
import { Inject, Injectable } from '@nestjs/common';
import { desc } from 'drizzle-orm';
import { DB, DBType } from '../global/providers/db.provider';
import { CreateResourceDto } from './model/error.dto';

@Injectable()
export class ResourceService {
  constructor(@Inject(DB) private db: DBType) {}
  async findAll() {
    const result = await this.db.query.resource.findMany({
      orderBy: [desc(resource.id)],
    });
    return result;
  }

  async createOne(dto: CreateResourceDto) {
    await this.db.insert(resource).values(dto);
  }
}
