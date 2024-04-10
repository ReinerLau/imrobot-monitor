import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ErrorModule } from './error/error.module';

@Module({
  imports: [ErrorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
