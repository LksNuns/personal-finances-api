// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path');

// eslint-disable-next-line no-undef
const root = resolve(__dirname);

// eslint-disable-next-line no-undef
module.exports = {
  rootDir: root,
  displayName: 'tests',
  testMatch: ['<rootDir>/src/**/*.spec.ts', '<rootDir>/test/**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};
