export enum RepositoryErrorType {
  InvalidParams = 'InvalidParams',
  Conflict = 'Conflict',
  NotFound = 'NotFound',
}

export class RepositoryError {
  protected type: RepositoryErrorType;
}
