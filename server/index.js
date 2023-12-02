require('dotenv').config();
const logger = require('./logger');
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

server.on('listening', () => {
  logger.log(`Server listening on ${PORT}`);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection at: Promise ', { reason });
});
