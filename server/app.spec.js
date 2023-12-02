jest.mock('express', () => {
  const originalModule = jest.requireActual('express');
  const expressFn = jest.fn().mockReturnValue({
    __esModule: true,
    ...originalModule,
    listen: jest.fn(),
    use: jest.fn(),
    get: jest.fn(),
  });
  expressFn.static = jest.fn();
  return expressFn;
});

describe('Application', () => {
  it('should create an express server', () => {
    const express = require('express')();
    const app = require('./app');
    expect(app).toBe(express);
  });
});
