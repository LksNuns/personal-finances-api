import { RepositoryErrorType } from './repository-error';

export class RepositoryResourceNotFound {
  public id: string;
  private readonly type = RepositoryErrorType.NotFound;

  constructor(id: string) {
    this.id = id;
  }
}
