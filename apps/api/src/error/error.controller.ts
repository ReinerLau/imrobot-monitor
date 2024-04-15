import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CodeService } from './code.service';
import { CreateCodeDto, CreateResourceDto } from './model/error.dto';
import { ResourceService } from './resource.service';
import { ensureUploadPath, SourceService, uploadPath } from './source.service';

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
  constructor(
    private codeService: CodeService,
    private sourceService: SourceService,
    private resourceService: ResourceService,
  ) {}

  @Get('code')
  findAllCode() {
    return this.codeService.findAll();
  }

  @Post('code')
  createOneCode(@Body() dto: CreateCodeDto) {
    return this.codeService.createOne(dto);
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
    return this.sourceService.findMap(fileName);
  }

  @Delete('clearMap')
  clearMap() {
    this.sourceService.clearMap();
  }

  @Get('export')
  async export() {
    return await this.sourceService.export();
  }

  @Get('resource')
  findAllResource() {
    return this.resourceService.findAll();
  }

  @Post('resource')
  createOneResource(@Body() dto: CreateResourceDto) {
    return this.resourceService.createOne(dto);
  }
}
