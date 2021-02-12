import { Transaction, TypeEnum } from '@/entities/transaction';
import { TransactionRepository } from '@/repositories/transactions';
import { RepositoryErrorType } from '@/utils/errors/repository-errors/repository-error';
import { getCustomRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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
        expect(response.body.errors).toMatchObject({
          type: RepositoryErrorType.InvalidParams,
          errors: [{ property: 'type' }],
        });

        // Sanity check
        expect(await transactionRepository.count()).toBe(0);
      });
    });
  });

  describe('#update', () => {
    let transaction: Transaction;

    beforeEach(async () => {
      // TODO Adding factory-girl to improve.
      transaction = await transactionRepository.create({
        description: 'Shopping',
        type: TypeEnum.outcome,
        value: 20.44,
        executedAt: '2020-09-09',
      });
    });

    describe('with valid params', () => {
      it('updates transaction', async () => {
        const params = {
          description: 'Changed Description',
          value: 10.55,
        };

        const response = await global.testRequest
          .patch(`/transactions/${transaction.id}`)
          .send(params);

        const updatedTransaction = await transactionRepository.findById(
          transaction.id
        );

        expect(response.status).toBe(200);
        expect(updatedTransaction?.value).toBe(10.55);
        expect(updatedTransaction?.description).toBe('Changed Description');
      });
    });

    describe('with invalid params', () => {
      it('return entity errors', async () => {
        const params = {
          description: 'Valid description',
          value: null,
        };

        const response = await global.testRequest
          .patch(`/transactions/${transaction.id}`)
          .send(params);

        const updatedTransaction = await transactionRepository.findById(
          transaction.id
        );

        expect(response.status).toBe(422);
        expect(response.body.errors).toMatchObject({
          type: RepositoryErrorType.InvalidParams,
          errors: [{ property: 'value' }],
        });
        expect(updatedTransaction?.value).toBe(transaction.value);
        expect(updatedTransaction?.description).toBe(transaction.description);
      });
    });
  });

  describe('#show', () => {
    let transaction: Transaction;

    beforeEach(async () => {
      // TODO Adding factory-girl to improve.
      transaction = await transactionRepository.create({
        description: 'Shopping',
        type: TypeEnum.outcome,
        value: 20.44,
        executedAt: '2020-09-09',
      });
    });

    describe('with valid transaction id', () => {
      it('return transcation', async () => {
        const response = await global.testRequest.get(
          `/transactions/${transaction.id}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
          value: 20.44,
        });
      });
    });

    describe('with invalid id', () => {
      it('return 404', async () => {
        const invalidId = uuidv4();
        const response = await global.testRequest.get(
          `/transactions/${invalidId}`
        );

        expect(response.status).toBe(404);
      });
    });
  });
});
