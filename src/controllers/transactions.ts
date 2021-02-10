import { CreateTransactionDto } from '@/dto/create-transaction.dto';
import { Body, Post, JsonController } from 'routing-controllers';

@JsonController('/transactions')
export class TransactionsController {
  @Post('')
  public create(@Body() data: CreateTransactionDto): any {
    console.log(data);
    return { ok: 'ok' };
  }
}
