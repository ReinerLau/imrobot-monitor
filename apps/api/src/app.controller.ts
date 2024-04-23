import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AppCreateDto } from './model/app.dto';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() dto: AppCreateDto) {
    this.appService.create(dto);
  }
}
