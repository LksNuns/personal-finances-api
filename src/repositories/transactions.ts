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
      return Promise.reject(this.parseValidatorErrors(errors));
    }

    await this.repository.save(transaction);

    return Promise.resolve(transaction);
  }

  async update(
    id: string,
    data: Partial<CreateTransactionDto>
  ): Promise<Transaction> {
    const transaction = await this.repository.findOne(id);

    const updatedTransaction = this.repository.create({
      ...transaction,
      ...data,
    });

    // TODO Extract `validate` to Base
    const errors = await validate(updatedTransaction);

    if (errors.length > 0) {
      return Promise.reject(this.parseValidatorErrors(errors));
    }

    await this.repository.save(updatedTransaction);

    return updatedTransaction;
  }
}
