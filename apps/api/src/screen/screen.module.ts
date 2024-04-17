import { Module } from '@nestjs/common';
import { GlobalModule } from '../global/global.module';
import { ScreenController } from './screen.controller';
import { ScreenService } from './screen.service';

@Module({
  imports: [GlobalModule],
  providers: [ScreenService],
  controllers: [ScreenController],
})
export class ScreenModule {}
