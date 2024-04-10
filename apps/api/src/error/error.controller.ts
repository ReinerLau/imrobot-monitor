import { Body, Controller, Get, Post } from '@nestjs/common';
import { ErrorService } from './error.service';
import { CreateErrorDto } from './model/error.dto';

@Controller('error')
export class ErrorController {
  constructor(private errorService: ErrorService) {}

  @Get()
  findAll() {
    return this.errorService.findAll();
  }

  @Post()
  createOne(@Body() dto: CreateErrorDto) {
    console.log(dto);
    return this.errorService.createOne(dto.message);
  }
}
