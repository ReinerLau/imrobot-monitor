import { Inject, Injectable } from '@nestjs/common';
import { DB, DBType } from '../global/providers/db.provider';
import { errors } from '@imrobot/schema';

@Injectable()
export class ErrorService {
  constructor(@Inject(DB) private db: DBType) {}
  async findAll() {
    const result = await this.db
      .select({
        id: errors.id,
        message: errors.message,
      })
      .from(errors);
    return result;
  }

  async createOne(message: string) {
    await this.db.insert(errors).values({
      message,
    });
  }
}
