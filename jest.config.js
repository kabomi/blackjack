/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  verbose: true,
  modulePathIgnorePatterns: ['<rootDir>/client/'],
};

module.exports = config;
