// From https://dev.to/caiulucas/tests-with-jest-and-typeorm-4j1l
import { createConnection, getConnection } from 'typeorm';

const database = {
  async createConnection(): Promise<void> {
    await createConnection();
  },

  async closeConnection(): Promise<void> {
    await getConnection().close();
  },

  async clear(): Promise<void> {
    // TODO Add guard clause to permit clear only in test environment

    const connection = getConnection();
    const entities = connection.entityMetadatas;

    const entityDeletionPromises = entities.map((entity) => async () => {
      // TODO This can causes some problems in the future
      // with Foreign key constraint as RESTRICT.
      // See TURNCATE option at https://www.postgresql.org/docs/current/sql-truncate.html
      // from https://stackoverflow.com/a/25183902
      // Join all entity names and do only one query.
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });

    await Promise.all(entityDeletionPromises);
  },
};

export default database;
