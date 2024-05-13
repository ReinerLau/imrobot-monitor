import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateFullSnapshotDto, CreateScreenDto } from './model/screen.dto';
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

  @Get('hasFull/:hash')
  async hasFull(@Param('hash') hash: string) {
    return await this.screenService.hasFull(hash);
  }

  @Post('full')
  async createFull(@Body() dto: CreateFullSnapshotDto) {
    await this.screenService.createFull(dto);
  }
}
