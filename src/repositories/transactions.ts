import { CreateTransactionDto } from '@/dto/create-transaction.dto';
import { Transaction } from '@/entities/transaction';
import { classToPlain } from 'class-transformer';
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
      return Promise.reject(this.parseClassValidatorErrors(errors));
    }

    await this.repository.save(transaction);

    return Promise.resolve(transaction);
  }
}
