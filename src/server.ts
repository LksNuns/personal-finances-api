import '../module-alias.config';

import { Server } from '@overnightjs/core';
import { Application } from 'express';
import bodyParser from 'body-parser';

import { TransactionsController } from './controllers/transactions';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  /*
   * We use a different method to init instead of using the constructor
   * this way we allow the server to be used in tests and normal initialization
   */
  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.setupControllers();
  }

  private setupControllers(): void {
    const transactionController = new TransactionsController();
    this.addControllers([transactionController]);
  }

  public getApp(): Application {
    return this.app;
  }
}
