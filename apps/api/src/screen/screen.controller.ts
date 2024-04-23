import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateScreenDto } from './model/screen.dto';
import { ScreenService } from './screen.service';

@Controller('screen')
export class ScreenController {
  constructor(private screenService: ScreenService) {}

  @Get(':time')
  async find(@Param('time') time: number) {
    return await this.screenService.findOne(time);
  }

  @Post()
  async createOne(@Body() dto: CreateScreenDto) {
    await this.screenService.createOne(dto);
  }
}
