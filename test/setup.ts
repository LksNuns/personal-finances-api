import { SetupServer } from '@/server';
import supertest from 'supertest';
import database from '../db/database';

let server: SetupServer;

beforeAll(async () => {
  server = new SetupServer();
  await server.init();
  global.testRequest = supertest(server.getApp());
});

afterAll(async () => {
  await server.close();
});

beforeEach(async () => {
  await database.clear();
});
