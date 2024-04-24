import { FactoryProvider } from '@nestjs/common';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { setupDB } from 'src/common/db';
import * as schema from '../../schema';

export const DB = Symbol('DB_SERVICE');

export type DBType = MySql2Database<typeof schema>;

export const DBProvider: FactoryProvider<DBType> = {
  provide: DB,
  useFactory: async () => {
    return await setupDB();
  },
};
