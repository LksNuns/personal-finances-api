import { CreateTransactionDto } from '@/dto/create-transaction.dto';
import { TransactionRepository } from '@/repositories/transactions';
import { Body, Post, JsonController } from 'routing-controllers';
import { getCustomRepository } from 'typeorm';

@JsonController('/transactions')
export class TransactionsController {
  @Post('')
  public async create(@Body() data: CreateTransactionDto): Promise<any> {
    const transactionRepository = getCustomRepository(TransactionRepository);

    try {
      await transactionRepository.create(data);
    } catch (error) {}

    return { ok: 'ok' };
  }
}
