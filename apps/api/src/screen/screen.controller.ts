import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateScreenDto } from './model/screen.dto';
import { ScreenService } from './screen.service';

@Controller('screen')
export class ScreenController {
  constructor(private screenService: ScreenService) {}

  @Get(':id')
  find(@Param('id') id: number) {
    return this.screenService.findOne(id);
  }

  @Post()
  createOne(@Body() dto: CreateScreenDto) {
    return this.screenService.createOne(dto);
  }
}
