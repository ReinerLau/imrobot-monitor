import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronTime } from 'cron';
import { desc } from 'drizzle-orm';
import { AppGateway } from './app.gateway';
import { DB, DBType } from './global/providers/db.provider';
import { AppCreateDto } from './model/app.dto';
import {
  app,
  behavior,
  code,
  fullSnapshot,
  request,
  resource,
  screen,
} from './schema';

@Injectable()
export class AppService {
  constructor(
    @Inject(DB) private db: DBType,
    private appGateway: AppGateway,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async findAll() {
    return await this.db.query.app.findMany({
      orderBy: [desc(app.id)],
    });
  }

  async create(dto: AppCreateDto) {
    await this.db.insert(app).values(dto);
  }

  async clear() {
    await this.db.delete(app);
    await this.db.delete(behavior);
    await this.db.delete(screen);
    await this.db.delete(code);
    await this.db.delete(request);
    await this.db.delete(resource);
    await this.db.delete(fullSnapshot);
  }

  @Cron(CronExpression.EVERY_MINUTE, {
    name: 'report',
    disabled: true,
  })
  report() {
    this.appGateway.connectedClient.emit('report');
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'clear',
  })
  clearAll() {
    this.clear();
  }

  setReportTime(time: string) {
    const job = this.schedulerRegistry.getCronJob('report');
    const cronTime = new CronTime(time);
    job.setTime(cronTime);
  }

  setClearTime(time: string) {
    const job = this.schedulerRegistry.getCronJob('clear');
    const cronTime = new CronTime(time);
    job.setTime(cronTime);
  }

  getReportTime() {
    const job = this.schedulerRegistry.getCronJob('report');
    return job.cronTime;
  }

  getClearTime() {
    const job = this.schedulerRegistry.getCronJob('clear');
    return job.cronTime;
  }
}
