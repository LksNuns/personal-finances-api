import { CreateTransactionDto } from '@/dto/create-transaction.dto';
import { Transaction } from '@/entities/transaction';
import { validate } from 'class-validator';
import { EntityRepository } from 'typeorm';
import { Base } from './base';

@EntityRepository(Transaction)
export class TransactionRepository extends Base<Transaction> {
  async create(data: CreateTransactionDto): Promise<Transaction> {
    const transaction = this.repository.create(data);

    const errors = await validate(transaction);

    if (errors.length > 0) {
      return Promise.reject(errors);
    }

    await this.repository.save(transaction);

    return Promise.resolve(transaction);
  }
}
