import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';
import { BehaviorModule } from './behavior/behavior.module';
import { DataModule } from './data/data.module';
import { ErrorModule } from './error/error.module';
import { GlobalModule } from './global/global.module';
import { ScreenModule } from './screen/screen.module';

@Module({
  imports: [
    GlobalModule,
    ErrorModule,
    BehaviorModule,
    ScreenModule,
    DataModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppGateway, AppService],
})
export class AppModule {}
