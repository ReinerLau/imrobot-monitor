import { Module } from '@nestjs/common';
import { ErrorController } from './error.controller';
import { ErrorService } from './error.service';
import { GlobalModule } from '../global/global.module';

@Module({
  imports: [GlobalModule],
  providers: [ErrorService],
  controllers: [ErrorController],
})
export class ErrorModule {}
