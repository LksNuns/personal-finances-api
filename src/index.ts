import 'reflect-metadata';

import { SetupServer } from './server';

const server = new SetupServer();
server.init();
server.start();
