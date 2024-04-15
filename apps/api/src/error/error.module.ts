import { Module } from '@nestjs/common';
import { GlobalModule } from '../global/global.module';
import { CodeService } from './code.service';
import { ErrorController } from './error.controller';
import { SourceService } from './source.service';

@Module({
  imports: [GlobalModule],
  providers: [CodeService, SourceService],
  controllers: [ErrorController],
})
export class ErrorModule {}
