import {
  AbstractRepository,
  FindManyOptions,
  QueryRunner,
  SelectQueryBuilder,
} from 'typeorm';

export class Base<Entity> extends AbstractRepository<Entity> {
  // TODO See better way to expose some methods from this.repository (delegator)
  createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner
  ): SelectQueryBuilder<Entity> {
    return this.repository.createQueryBuilder(alias, queryRunner);
  }

  async findAll(): Promise<Entity[]> {
    return this.repository.find();
  }

  async find(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(options);
  }

  async findById(id: string): Promise<Entity | undefined> {
    return await this.repository.findOne(id);
  }

  async destroy(id: string): Promise<Entity | undefined> {
    const resource = await this.repository.findOne(id);

    await this.repository.delete(id);

    return resource;
  }

  async count(options?: FindManyOptions<Entity>): Promise<number> {
    return this.repository.count(options);
  }
}
