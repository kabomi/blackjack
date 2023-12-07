/** Abstract DbClient */
class DbClient {
  constructor(_dbConnection) {
    this._dbConnection = _dbConnection;
  }
  // eslint-disable-next-line no-unused-vars
  async create(state) {}
  // eslint-disable-next-line no-unused-vars
  async findById(state) {}
  // eslint-disable-next-line no-unused-vars
  async update(state) {}
}

module.exports = DbClient;
