import { CreateTransactionDto } from '@/dto/create-transaction.dto';
import { TransactionRepository } from '@/repositories/transactions';
import { Body, Post, JsonController, Get } from 'routing-controllers';
import { getCustomRepository } from 'typeorm';

@JsonController('/transactions')
export class TransactionsController {
  private readonly transactionRepository: TransactionRepository;

  constructor() {
    this.transactionRepository = getCustomRepository(TransactionRepository);
  }

  @Get('')
  public async index(): Promise<any> {
    return this.transactionRepository.findAll();
  }

  @Post('')
  public async create(@Body() data: CreateTransactionDto): Promise<any> {
    try {
      await this.transactionRepository.create(data);
    } catch (error) {
      console.log(error);
      // TODO Define errors
    }

    return { ok: 'ok' };
  }
}
