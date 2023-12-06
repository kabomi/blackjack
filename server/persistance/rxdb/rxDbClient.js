const DbClient = require('../dbClient');

class RxDbClient extends DbClient {
  constructor(_dbConnection) {
    super(_dbConnection);
  }
}

module.exports = RxDbClient;
