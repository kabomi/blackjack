describe('Server', () => {
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
  it('should start', () => {
    const express = require('express')();
    require('./index');
    expect(express.listen).toHaveBeenCalledWith(
      process.env.PORT,
      expect.any(Function)
    );
  });
});
