import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ensureUploadPath, ErrorService, uploadPath } from './error.service';
import { CreateErrorDto } from './model/error.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const storage = diskStorage({
  destination(req, file, cb) {
    ensureUploadPath();
    cb(null, uploadPath);
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
  findMap(@Query('fileName') fileName: string) {
    return this.errorService.findMap(fileName);
  }

  @Delete('clearMap')
  clearMap() {
    this.errorService.clearMap();
  }

  @Get('export')
  async export() {
    return await this.errorService.export();
  }
}
