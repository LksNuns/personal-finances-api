import { CreateTransactionDto } from '@/dto/create-transaction.dto';
import { Transaction } from '@/entities/transaction';
import { TransactionRepository } from '@/repositories/transactions';
import { RepositoryErrorType } from '@/utils/errors/repository-errors/repository-error';
import { UnprocessableEntityError } from '@/utils/errors/unprocessable-entity-error';
import {
  Body,
  Post,
  JsonController,
  Get,
  Patch,
  Delete,
  Param,
  NotFoundError,
  InternalServerError,
} from 'routing-controllers';
import { getCustomRepository } from 'typeorm';
import { BaseController } from './base-controller';

@JsonController('/transactions')
export class TransactionsController extends BaseController {
  private readonly transactionRepository: TransactionRepository;

  constructor() {
    super();
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
      throw this.invalidResourceErrorResponse(error);
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
      throw this.invalidResourceErrorResponse(error);
    }
  }

  @Get('/:id')
  public async show(@Param('id') id: string): Promise<Transaction | undefined> {
    try {
      return await this.transactionRepository.findById(id);
    } catch (error) {
      throw this.invalidResourceErrorResponse(error);
    }
  }
}
