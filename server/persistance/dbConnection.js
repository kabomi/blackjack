const { addRxPlugin } = require('rxdb');
const { RxDBDevModePlugin } = require('rxdb/plugins/dev-mode');
addRxPlugin(RxDBDevModePlugin);

const { createRxDatabase } = require('rxdb');
const { getRxStorageMemory } = require('rxdb/plugins/storage-memory');

/** Abstract DbClient */
class DbClient {
  constructor(_dbConnection) {
    this._dbConnection = _dbConnection;
  }
  // eslint-disable-next-line no-unused-vars
  async create(state) {}
}

class RxDbClient extends DbClient {
  constructor(_dbConnection) {
    super(_dbConnection);
  }
}

let _dbConnection = null; // Reuse existing connection
async function initialize() {
  if (!_dbConnection) {
    _dbConnection = await createRxDatabase({
      name: 'blackjack',
      storage: getRxStorageMemory(),
    });
  }

  return new RxDbClient(_dbConnection);
}

function get() {
  return new RxDbClient(_dbConnection);
}

module.exports = {
  DbClient,
  RxDbClient,
  initialize,
  get,
};
