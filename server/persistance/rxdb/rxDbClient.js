const DbClient = require('../dbClient');

class RxDbClient extends DbClient {
  /** @type {(_dbConnection: import('rxdb').RxDatabase)} */
  constructor(_dbConnection) {
    super(_dbConnection);
  }

  async create(collection, state) {
    await this._dbConnection[collection].insert({
      ...state,
      createdAt: new Date().toISOString(),
    });
  }

  async findById(collection, id) {
    const results = await this._dbConnection[collection]
      .find({
        selector: {
          id: {
            $eq: id,
          },
        },
      })
      .exec();
    return results[0];
  }
}

module.exports = RxDbClient;
