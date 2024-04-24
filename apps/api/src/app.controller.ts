import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AppCreateDto } from './model/app.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findAll() {
    return await this.appService.findAll();
  }

  @Post()
  create(@Body() dto: AppCreateDto) {
    this.appService.create(dto);
  }

  @Delete()
  clear() {
    this.appService.clear();
  }

  @Post('setReportTime')
  setReportTime(@Body('time') time: string) {
    this.appService.setReportTime(time);
  }

  @Post('setClearTime')
  setClearTime(@Body('time') time: string) {
    this.appService.setClearTime(time);
  }

  @Get('getReportTime')
  getReportTime() {
    return this.appService.getReportTime();
  }

  @Get('getClearTime')
  getClearTime() {
    return this.appService.getClearTime();
  }
}
