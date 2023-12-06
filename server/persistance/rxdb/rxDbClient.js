const DbClient = require('../dbClient');

class RxDbClient extends DbClient {
  constructor(_dbConnection) {
    super(_dbConnection);
  }

  async create(collection, state) {
    await this._dbConnection[collection].insert({
      ...state,
      createdAt: new Date().toISOString(),
    });
  }
}

module.exports = RxDbClient;
