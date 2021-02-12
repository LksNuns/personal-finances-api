import { RepositoryErrorType } from '@/utils/errors/repository-errors/repository-error';
import { UnprocessableEntityError } from '@/utils/errors/unprocessable-entity-error';

import {
  HttpError,
  InternalServerError,
  NotFoundError,
} from 'routing-controllers';

export abstract class BaseController {
  protected invalidResourceErrorResponse(error: any): HttpError {
    if (error?.type === RepositoryErrorType.InvalidParams) {
      return new UnprocessableEntityError(error);
    } else if (error?.type === RepositoryErrorType.NotFound) {
      return new NotFoundError();
    }

    return new InternalServerError('internal error');
  }
}
