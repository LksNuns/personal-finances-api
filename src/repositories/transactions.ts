import { CreateTransactionDto } from '@/dto/create-transaction.dto';
import { Transaction } from '@/entities/transaction';
import { RepositoryResourceNotFound } from '@/utils/errors/repository-errors/repository-resource-not-found';
import { RepositoryValidationError } from '@/utils/errors/repository-errors/repository-validation-error';
import { validate } from 'class-validator';
import { EntityRepository } from 'typeorm';
import { Base } from './base';

@EntityRepository(Transaction)
export class TransactionRepository extends Base<Transaction> {
  async create(data: CreateTransactionDto): Promise<Transaction> {
    const transaction = this.repository.create(data);

    // TODO Extract `validate` to Base
    const errors = await validate(transaction);

    if (errors.length > 0) {
      const parsedErrors = this.parseValidatorErrors(errors);
      return Promise.reject(new RepositoryValidationError(parsedErrors));
    }

    await this.repository.save(transaction);

    return Promise.resolve(transaction);
  }

  async update(
    id: string,
    data: Partial<CreateTransactionDto>
  ): Promise<Transaction> {
    let transaction: Transaction | undefined;

    try {
      transaction = await this.repository.findOne(id);
    } catch (error) {
      return Promise.reject(new RepositoryResourceNotFound(id));
    }

    if (!transaction) {
      return Promise.reject(new RepositoryResourceNotFound(id));
    }

    const updatedTransaction = this.repository.create({
      ...transaction,
      ...data,
    });

    // TODO Extract `validate` to Base
    const errors = await validate(updatedTransaction);

    if (errors.length > 0) {
      const parsedErrors = this.parseValidatorErrors(errors);
      return Promise.reject(new RepositoryValidationError(parsedErrors));
    }

    await this.repository.save(updatedTransaction);

    return updatedTransaction;
  }
}
