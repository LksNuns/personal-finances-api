import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('transactions')
export class TransactionsController {
  @Get('')
  public index(_: Request, res: Response): void {
    res.send({ ok: 'ok' });
  }
}
