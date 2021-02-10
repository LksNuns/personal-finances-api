import { Transaction } from '@/entities/transaction';
import { getConnection } from 'typeorm';

describe('/transactions', () => {
  describe('when create a new transaction', () => {
    describe('with valid params', () => {
      it('creates a new transaction', async () => {
        const params = {
          description: 'Valid description',
          type: 'income',
          value: 20.44,
          executedAt: '2020-09-09',
        };

        const repository = getConnection().getRepository(Transaction);

        // // Sanity check
        expect(await repository.count()).toBe(0);

        const response = await global.testRequest
          .post('/transactions')
          .send(params);

        expect(response.status).toBe(200);
        expect(await repository.count()).toBe(1);

        // find first
        // expect return serialized finded transaction
      });
    });
  });
});
