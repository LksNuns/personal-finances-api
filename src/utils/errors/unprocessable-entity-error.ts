import { EntityValidationError } from '@/repositories/base';
import { HttpError } from 'routing-controllers';

interface UnprocessableEntityResponse {
  status: number;
  errors: EntityValidationError[];
}

export class UnprocessableEntityError extends HttpError {
  public errors: EntityValidationError[];
  public args: any[];

  constructor(errors: EntityValidationError[]) {
    super(422);
    Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
    this.errors = errors;
    // this.args = args; // can be used for internal logging
  }

  toJSON(): UnprocessableEntityResponse {
    return {
      status: this.httpCode,
      errors: this.errors,
    };
  }
}
