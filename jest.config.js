/** @type {import('jest').Config} */
const config = {
  verbose: true,
  moduleDirectories: ['<rootDir>/server/'],
  modulePathIgnorePatterns: ['<rootDir>/client/'],
};

module.exports = config;
