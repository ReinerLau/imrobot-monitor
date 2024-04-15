import { resource } from '@imrobot/schema';
import { Inject, Injectable } from '@nestjs/common';
import { DB, DBType } from '../global/providers/db.provider';
import { CreateResourceDto } from './model/error.dto';

@Injectable()
export class ResourceService {
  constructor(@Inject(DB) private db: DBType) {}
  async findAll() {
    const result = await this.db
      .select({
        id: resource.id,
        url: resource.url,
        target: resource.target,
        source: resource.source,
        time: resource.time,
      })
      .from(resource);
    return result;
  }

  async createOne(dto: CreateResourceDto) {
    await this.db.insert(resource).values(dto);
  }
}
