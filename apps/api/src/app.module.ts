import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BehaviorModule } from './behavior/behavior.module';
import { ErrorModule } from './error/error.module';

@Module({
  imports: [ErrorModule, BehaviorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
