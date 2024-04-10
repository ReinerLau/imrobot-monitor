import { Global, Module } from '@nestjs/common';
import { DB, DBProvider } from './providers/db.provider';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  providers: [DBProvider],
  exports: [DB],
})
export class GlobalModule {}
