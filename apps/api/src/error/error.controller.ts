import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ErrorService } from './error.service';
import { CreateErrorDto } from './model/error.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const storage = diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

@Controller('error')
export class ErrorController {
  constructor(private errorService: ErrorService) {}

  @Get()
  findAll() {
    return this.errorService.findAll();
  }

  @Post()
  createOne(@Body() dto: CreateErrorDto) {
    return this.errorService.createOne(dto);
  }

  @Post('uploadSourceMap')
  @UseInterceptors(
    FileInterceptor('files', {
      storage,
    }),
  )
  uploadSource() {}

  @Get('getMap')
  findMap(@Query('fileName') fileName: any) {
    return this.errorService.findMap(fileName);
  }
}
