import { CreateTransactionDto } from '@/dto/create-transaction.dto';
import { Transaction } from '@/entities/transaction';
import { TransactionRepository } from '@/repositories/transactions';
import { UnprocessableEntityError } from '@/utils/errors/unprocessable-entity-error';
import {
  Body,
  Post,
  JsonController,
  Get,
  Patch,
  Param,
} from 'routing-controllers';
import { getCustomRepository } from 'typeorm';

@JsonController('/transactions')
export class TransactionsController {
  private readonly transactionRepository: TransactionRepository;

  constructor() {
    this.transactionRepository = getCustomRepository(TransactionRepository);
  }

  @Get('')
  public async index(): Promise<Transaction[]> {
    return this.transactionRepository.findAll();
  }

  @Post('')
  public async create(
    @Body({ validate: false }) data: CreateTransactionDto
  ): Promise<Transaction> {
    try {
      return await this.transactionRepository.create(data);
    } catch (error) {
      throw new UnprocessableEntityError(error);
    }
  }

  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body({ validate: false }) data: CreateTransactionDto
  ): Promise<Transaction> {
    try {
      return await this.transactionRepository.update(id, data);
    } catch (error) {
      throw new UnprocessableEntityError(error);
    }
  }
}
