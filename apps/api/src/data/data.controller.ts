import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ensureDirSync } from 'fs-extra';
import { diskStorage } from 'multer';
import { DataService } from './data.service';

const storage = diskStorage({
  destination(req, file, cb) {
    ensureUploadPath();
    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadPath = 'uploads';

function ensureUploadPath() {
  ensureDirSync(uploadPath);
}

@Controller('data')
export class DataController {
  constructor(private dataService: DataService) {}

  @Get('export')
  exports() {
    return this.dataService.export();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    this.dataService.upload(file);
  }
}
