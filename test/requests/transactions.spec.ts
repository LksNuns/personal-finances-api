import { TypeEnum } from '@/entities/transaction';
import { TransactionRepository } from '@/repositories/transactions';
import { getCustomRepository } from 'typeorm';

describe('/transactions', () => {
  let transactionRepository: TransactionRepository;

  beforeAll(() => {
    transactionRepository = getCustomRepository(TransactionRepository);
  });

  describe('#index', () => {
    beforeEach(async () => {
      // TODO Adding factory-girl to improve.
      await transactionRepository.create({
        description: 'Shopping',
        type: TypeEnum.outcome,
        value: 20.44,
        executedAt: '2020-09-09',
      });

      await transactionRepository.create({
        description: 'Salary',
        type: TypeEnum.income,
        value: 1200,
        executedAt: '2020-09-07',
      });
    });

    it('lists transactions', async () => {
      const response = await global.testRequest.get('/transactions');

      expect(response.body).toMatchObject([
        { description: 'Shopping', type: 'outcome' },
        { description: 'Salary', type: 'income' },
      ]);
    });
  });

  describe('#create', () => {
    describe('with valid params', () => {
      it('creates a new transaction', async () => {
        const params = {
          description: 'Valid description',
          type: 'income',
          value: 20.44,
          executedAt: '2020-09-09',
        };

        // Sanity check
        expect(await transactionRepository.count()).toBe(0);

        const response = await global.testRequest
          .post('/transactions')
          .send(params);

        expect(response.status).toBe(200);
        expect(await transactionRepository.count()).toBe(1);

        // find first
        // expect return serialized finded transaction
      });
    });

    describe('with invalid params', () => {
      it('return entity errors', async () => {
        const params = {
          description: 'Valid description',
          // type: 'income',
          value: 20.44,
          executedAt: '2020-09-09',
        };

        const response = await global.testRequest
          .post('/transactions')
          .send(params);

        expect(response.status).toBe(422);
        expect(response.body.errors).toMatchObject([{ property: 'type' }]);

        // Sanity check
        expect(await transactionRepository.count()).toBe(0);
      });
    });
  });
});
