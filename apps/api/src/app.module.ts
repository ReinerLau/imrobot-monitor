import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BehaviorModule } from './behavior/behavior.module';
import { DataModule } from './data/data.module';
import { ErrorModule } from './error/error.module';
import { ScreenModule } from './screen/screen.module';

@Module({
  imports: [ErrorModule, BehaviorModule, ScreenModule, DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
