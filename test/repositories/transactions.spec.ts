import { CreateTransactionDto } from '@/dto/create-transaction.dto';
import { Transaction, TypeEnum } from '@/entities/transaction';
import { TransactionRepository } from '@/repositories/transactions';
import { getCustomRepository } from 'typeorm';

describe('TransactionRepository', () => {
  let repository: TransactionRepository;

  beforeAll(() => {
    repository = getCustomRepository(TransactionRepository);
  });

  describe('#create', () => {
    // Partial to permit invalid params
    let params: Partial<CreateTransactionDto>;

    describe('with invalid params', () => {
      beforeEach(() => {
        // Missing required params: "type" and "executedAt"
        params = { value: 22.0 };
      });

      it('returns an error', async () => {
        await expect(
          repository.create(params as CreateTransactionDto)
        ).rejects.toMatchObject([
          { property: 'type' },
          { property: 'executedAt' },
        ]);
      });
    });

    describe('with valid params', () => {
      beforeEach(() => {
        params = {
          value: 22.0,
          type: TypeEnum.income,
          executedAt: '2020-10-10',
        };
      });

      it('saves to database', async () => {
        // Sanity check
        expect(await repository.count()).toBe(0);

        // TODO Should we mock `respository.save()` to avoid using database (?)
        const transaction = await repository.create(
          params as CreateTransactionDto
        );

        expect(await repository.count()).toBe(1);
        expect(transaction).toMatchObject({ value: 22.0 });
      });
    });
  });

  describe('#update', () => {
    // Partial to permit invalid params
    let params: Partial<CreateTransactionDto>;
    let transaction: Transaction;

    beforeEach(async () => {
      // TODO Adding factory-girl to improve.
      transaction = await repository.create({
        description: 'Shopping',
        type: TypeEnum.outcome,
        value: 20.44,
        executedAt: '2020-09-09',
      });
    });

    describe('with invalid params', () => {
      beforeEach(() => {
        params = { value: undefined };
      });

      it('returns an error', async () => {
        await expect(
          repository.update(transaction.id, params as CreateTransactionDto)
        ).rejects.toMatchObject([{ property: 'value' }]);
      });
    });

    describe('with valid params', () => {
      beforeEach(() => {
        params = {
          value: 10.0,
        };
      });

      it('updates transaction values', async () => {
        // TODO Should we mock `respository.save()` to avoid using database (?)
        const updatedTransaction = await repository.update(
          transaction.id,
          params as CreateTransactionDto
        );

        expect(updatedTransaction).toMatchObject({ value: 10.0 });
      });
    });
  });
});
