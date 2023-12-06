const { addRxPlugin, createRxDatabase } = require('rxdb');
const { RxDBDevModePlugin } = require('rxdb/plugins/dev-mode');

if (process.env.ENV !== 'production') {
  addRxPlugin(RxDBDevModePlugin);
}

const { getRxStorageMemory } = require('rxdb/plugins/storage-memory');
const { gameSchema } = require('./rxdb/schemas');

/** Abstract DbClient */
class DbClient {
  constructor(_dbConnection) {
    this._dbConnection = _dbConnection;
  }
  // eslint-disable-next-line no-unused-vars
  async create(state) {}
  // eslint-disable-next-line no-unused-vars
  async get(state) {}
  // eslint-disable-next-line no-unused-vars
  async update(state) {}
}

class RxDbClient extends DbClient {
  constructor(_dbConnection) {
    super(_dbConnection);
  }
}

let _dbConnection = null; // Reuse existing connection
async function initialize() {
  if (!_dbConnection) {
    _dbConnection = await createDb();
    addCollections(_dbConnection);
  }

  return new RxDbClient(_dbConnection);
}

async function createDb() {
  return await createRxDatabase({
    name: 'blackjack',
    storage: getRxStorageMemory(),
  });
}

async function addCollections(_dbConnection) {
  await _dbConnection.addCollections({
    game: {
      schema: gameSchema,
    },
  });
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
