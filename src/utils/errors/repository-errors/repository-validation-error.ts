import { EntityValidationError } from '@/repositories/base';
import { RepositoryErrorType } from './repository-error';

export class RepositoryValidationError extends Error {
  public errors: EntityValidationError[];
  private readonly type = RepositoryErrorType.InvalidParams;

  constructor(errors: EntityValidationError[]) {
    super();
    this.errors = errors;
  }
}
