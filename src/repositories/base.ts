import { RepositoryResourceNotFound } from '@/utils/errors/repository-errors/repository-resource-not-found';
import { ValidationError } from 'class-validator';
import {
  AbstractRepository,
  FindManyOptions,
  QueryRunner,
  SelectQueryBuilder,
} from 'typeorm';

export interface EntityValidationError {
  errors: string[];
  property: string;
}

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

  async destroy(id: string): Promise<Entity> {
    let resource: Entity | undefined;
    try {
      resource = await this.repository.findOne(id);
    } catch (error) {
      return Promise.reject(new RepositoryResourceNotFound(id));
    }

    if (!resource) {
      return Promise.reject(new RepositoryResourceNotFound(id));
    }

    await this.repository.delete(id);

    return resource;
  }

  async count(options?: FindManyOptions<Entity>): Promise<number> {
    return this.repository.count(options);
  }

  public parseValidatorErrors(
    errors: ValidationError[]
  ): EntityValidationError[] {
    return errors.map((error) => {
      const plainError = {} as EntityValidationError;
      plainError.property = error.property;

      if (error.constraints) {
        plainError.errors = Object.keys(error.constraints);
      }

      return plainError;
    });
  }
}
