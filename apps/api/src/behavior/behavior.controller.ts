import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BehaviorService } from './behavior.service';
import { CreateBehaviorDto } from './model/behavior.dto';

@Controller('behavior')
export class BehaviorController {
  constructor(private behaviorService: BehaviorService) {}

  @Get(':id')
  find(@Param('id') id: number) {
    return this.behaviorService.findOne(id);
  }

  @Post()
  createOne(@Body() dto: CreateBehaviorDto) {
    return this.behaviorService.createOne(dto);
  }
}
