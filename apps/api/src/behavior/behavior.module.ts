import { Module } from '@nestjs/common';
import { GlobalModule } from '../global/global.module';
import { BehaviorController } from './behavior.controller';
import { BehaviorService } from './behavior.service';

@Module({
  imports: [GlobalModule],
  providers: [BehaviorService],
  controllers: [BehaviorController],
})
export class BehaviorModule {}
