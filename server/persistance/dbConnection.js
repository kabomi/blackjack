const { addRxPlugin, createRxDatabase } = require('rxdb');
const { RxDBDevModePlugin } = require('rxdb/plugins/dev-mode');

if (process.env.ENV !== 'production') {
  addRxPlugin(RxDBDevModePlugin);
}

const { getRxStorageMemory } = require('rxdb/plugins/storage-memory');
const { gameSchema } = require('./rxdb/schemas');
const RxDbClient = require('./rxdb/RxDbClient');

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
  initialize,
  get,
};
