import { app } from '@imrobot/schema';
import { Inject, Injectable } from '@nestjs/common';
import { desc } from 'drizzle-orm';
import { DB, DBType } from './global/providers/db.provider';
import { AppCreateDto } from './model/app.dto';

@Injectable()
export class AppService {
  constructor(@Inject(DB) private db: DBType) {}

  async findAll() {
    return await this.db.query.app.findMany({
      orderBy: [desc(app.id)],
    });
  }

  async create(dto: AppCreateDto) {
    await this.db.insert(app).values(dto);
  }
}
