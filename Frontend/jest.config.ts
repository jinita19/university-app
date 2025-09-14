import type { Config } from 'jest';

console.log(__dirname);
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/mocks/styleMock.js"
  }
};

module.exports = config;