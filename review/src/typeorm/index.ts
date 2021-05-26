import type { ConnectionOptions } from 'typeorm';

const credentials = {
  type: 'mysql' as 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'speak_backend',
};

const options: ConnectionOptions = {
  entities: [`${__dirname}/../*.entity{.ts,.js}`],
  synchronize: true,
  dropSchema: false,
  migrationsRun: false,
  logger: 'debug',
  timezone: 'Z',
  ...credentials,
};

export default options;
