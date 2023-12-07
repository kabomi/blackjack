/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  verbose: true,
  modulePathIgnorePatterns: ['<rootDir>/client/'],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 80,
      functions: 80,
      lines: 90,
    },
  },
  coverageDirectory: '<rootDir>/server/coverage',
  coverageReporters: ['text', 'html', 'cobertura'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!client/**/*',
    '!server/coverage/**/*',
    '!jest.config.js',
    '!server/persistance/dbClient.js',
  ],
  restoreMocks: true,
};

module.exports = config;
