import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BehaviorService } from './behavior.service';
import { CreateBehaviorDto } from './model/behavior.dto';

@Controller('behavior')
export class BehaviorController {
  constructor(private behaviorService: BehaviorService) {}

  @Get(':time')
  async find(@Param('time') time: number) {
    return await this.behaviorService.findOne(time);
  }

  @Post()
  async createOne(@Body() dto: CreateBehaviorDto) {
    await this.behaviorService.create(dto);
  }
}
