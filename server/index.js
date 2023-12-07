async function run() {
  const logger = require('./logger');
  // Initialize Db/DbConnection
  await require('./persistance/dbConnection').initialize();
  const app = require('./app');

  const PORT = process.env.PORT;
  const server = app.listen(PORT);
  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection at: Promise ', { reason });
  });
  process.on('uncaughtException', (error, origin) => {
    if (origin === 'uncaughtException') {
      logger.error('Uncaught Exception:', { error });
    }
  });
  process.on('SIGINT', function () {
    console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
    server.close();
    console.log(`Close the server listening on ${PORT}`);
    process.exit(0);
  });

  server.on('listening', () => {
    logger.log(`Server listening on ${PORT}`);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection at: Promise ', { reason });
  });

  return Promise.resolve(server);
}

module.exports = run();
