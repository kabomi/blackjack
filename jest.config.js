/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  verbose: true,
  modulePathIgnorePatterns: ['<rootDir>/client/'],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  coverageDirectory: '<rootDir>/server/coverage',
  coverageReporters: ['text', 'html', 'cobertura'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!client/**/*',
    '!coverage/**/*',
    '!jest.config.js',
  ],
  restoreMocks: true,
};

module.exports = config;
