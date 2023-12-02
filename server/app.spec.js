jest.mock('express', () => {
  const originalModule = jest.requireActual('express');
  const expressFn = jest.fn().mockReturnValue({
    __esModule: true,
    ...originalModule,
    listen: jest.fn(),
    use: jest.fn(),
    get: jest.fn(),
  });
  expressFn.static = originalModule.static;
  expressFn.Router = originalModule.Router;
  return expressFn;
});

describe('Application', () => {
  it('should create an express server', () => {
    const express = require('express')();
    const app = require('./app');
    expect(app).toBe(express);
  });
  it('should configure services', () => {
    require('express')();
    const app = require('./app');

    const services = require('./services');
    expect(app.use).toHaveBeenCalledWith('/api/game', services);
  });
});
