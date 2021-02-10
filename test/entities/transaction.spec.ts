import { Transaction, TypeEnum } from '@/entities/transaction';
import { validate } from 'class-validator';
import { getConnection } from 'typeorm';
// import { validate } from 'class-validator';
// import { getConnection } from 'typeorm';

interface TransactionData {
  description: string;
  value: number;
  type: TypeEnum;
  executed_at: number;
}

describe('models/transactions', () => {
  let validData: TransactionData;
  let subject;

  beforeEach(() => {
    // TODO Replace with factory-bot and faker util libs
    validData = {
      description: 'First transaction',
      value: 10.2,
      type: TypeEnum.income,
      executed_at: Date.now(),
    };
  });

  describe('validations', () => {
    describe('value', () => {
      describe('when is null or negative', () => {
        it('returns "value" errors', async () => {
          const repository = getConnection().getRepository(Transaction);
          const transaction = repository.create({ ...validData, value: -2 });

          const errors = await validate(transaction);
          expect(errors[0]?.constraints).toHaveProperty('isPositive');
        });
      });

      // it('validates with positive values', () => {});
    });
  });
});
