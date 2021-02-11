import '../module-alias.config';

import { default as express, Application } from 'express';
import bodyParser from 'body-parser';
import * as http from 'http';
import database from '../db/database';

import { TransactionsController } from './controllers/transactions';
import { useExpressServer } from 'routing-controllers';

import { types } from 'pg';

// TODO Extract to a specific initializer
// Necessary to convert decimal values as number
//github.com/typeorm/typeorm/issues/1875#issuecomment-731518342
types.setTypeParser(types.builtins.NUMERIC, (value: string): number =>
  parseFloat(value)
);

export class SetupServer {
  private readonly app: Application;
  private server?: http.Server;

  constructor(private port = 3000) {
    this.app = express();
  }

  /*
   * We use a different method to init instead of using the constructor
   * this way we allow the server to be used in tests and normal initialization
   */
  public async init(): Promise<void> {
    await this.setupDatabase();
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private setupControllers(): void {
    useExpressServer(this.app, {
      controllers: [TransactionsController],
    });
  }

  private async setupDatabase(): Promise<void> {
    await database.createConnection();
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      console.log(`starting server on ${this.port}`);
      // logger.info('Server listening on port: ' + this.port);
    });
  }

  public async close(): Promise<void> {
    await database.closeConnection();

    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve(true);
        });
      });
    }
  }

  public getApp(): Application {
    return this.app;
  }
}
