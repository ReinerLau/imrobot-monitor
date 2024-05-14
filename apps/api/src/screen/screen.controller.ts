import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateScreenDto } from './model/screen.dto';
import { ScreenService } from './screen.service';

@Controller('screen')
export class ScreenController {
  constructor(private screenService: ScreenService) {}

  @Get()
  async find(
    @Query('startTime') startTime: number,
    @Query('endTime') endTime: number,
  ) {
    return await this.screenService.findOne(startTime, endTime);
  }

  @Post()
  async createOne(@Body() dto: CreateScreenDto) {
    await this.screenService.createOne(dto);
  }

  @Get('hasFull/:hash')
  async hasFull(@Param('hash') hash: string) {
    return await this.screenService.hasFull(hash);
  }
}
