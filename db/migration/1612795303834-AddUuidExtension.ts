import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddUuidExtension1612795303834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
