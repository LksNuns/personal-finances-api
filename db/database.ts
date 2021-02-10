// From https://dev.to/caiulucas/tests-with-jest-and-typeorm-4j1l
import { createConnection, getConnection } from 'typeorm';
import config from 'config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import path from 'path';
import NamingStrategy from './naming-strategy';

type ConnectionConfig = Partial<PostgresConnectionOptions>;

const ROOT_DIR = path.join(__dirname, '..');

const database = {
  async createConnection(): Promise<void> {
    const dbConfig = config.get('App.typeorm') as ConnectionConfig;

    await createConnection({
      ...dbConfig,
      type: 'postgres',
      host: 'db',
      port: 5432,
      synchronize: false,
      namingStrategy: new NamingStrategy(),
      entities: [path.join(ROOT_DIR, 'src/entities/**/*.ts')],
    });
  },

  async closeConnection(): Promise<void> {
    await getConnection().close();
  },

  async clear(): Promise<void> {
    // Only for tests
    if (process.env.NODE_ENV !== 'test') return;

    const connection = getConnection();

    const entityTableNames = connection.entityMetadatas
      .map((entity) => entity.tableName)
      .join(', ');

    // See TURNCATE at https://www.postgresql.org/docs/current/sql-truncate.html
    // from https://stackoverflow.com/a/25183902
    await connection.manager.query(`TRUNCATE ${entityTableNames} CASCADE`);
  },
};

export default database;
