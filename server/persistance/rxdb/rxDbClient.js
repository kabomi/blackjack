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

  // eslint-disable-next-line no-unused-vars
  async update(collection, { id, createdAt, ...rest }) {
    const document = await this.findById(collection, id);
    await document.modify((docData) => {
      Object.assign(docData, rest);
      return docData;
    });
  }
}

module.exports = RxDbClient;
