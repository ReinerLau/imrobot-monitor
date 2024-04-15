import { request } from '@imrobot/schema';
import { Inject, Injectable } from '@nestjs/common';
import { DB, DBType } from '../global/providers/db.provider';
import { CreateRequestDto } from './model/error.dto';

@Injectable()
export class RequestService {
  constructor(@Inject(DB) private db: DBType) {}
  async findAll() {
    const result = await this.db
      .select({
        id: request.id,
        requestURL: request.requestURL,
        status: request.status,
        reponse: request.response,
        elapsedTime: request.elapsedTime,
        url: request.url,
        time: request.time,
        method: request.method,
        requestData: request.requestData,
      })
      .from(request);
    return result;
  }

  async createOne(dto: CreateRequestDto) {
    await this.db.insert(request).values(dto);
  }
}
