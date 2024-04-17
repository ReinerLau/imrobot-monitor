import { Module } from '@nestjs/common';
import { GlobalModule } from 'src/global/global.module';
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  imports: [GlobalModule],
  providers: [DataService],
  controllers: [DataController],
})
export class DataModule {}
