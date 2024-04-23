import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
