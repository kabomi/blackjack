describe('Server', () => {
  it('should start', () => {
    const app = require('./app');
    jest.spyOn(app, 'listen').mockImplementation(() => ({
      on: jest.fn(),
      use: jest.fn(),
      get: jest.fn(),
    }));
    require('./index');
    expect(app.listen).toHaveBeenCalledWith(process.env.PORT);
  });
});
