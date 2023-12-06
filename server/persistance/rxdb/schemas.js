const cardSchema = {
  type: 'object',
  properties: {
    face: {
      type: 'string',
    },
    suit: {
      type: 'string',
    },
  },
};

const handSchema = {
  type: 'object',
  properties: {
    cards: {
      type: 'array',
      maxItems: 1,
      uniqueItems: true,
      items: cardSchema,
    },
    points: {
      type: 'number',
    },
  },
};

const gameSchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100, // <- the primary key must have set maxLength
    },
    dealer: handSchema,
    players: {
      type: 'array',
      maxItems: 1,
      uniqueItems: true,
      items: handSchema,
    },
    winner: {
      type: 'string',
    },
    finished: {
      type: 'boolean',
    },
    createdAt: {
      type: 'date-time',
    },
    updatedAt: {
      type: 'date-time',
    },
  },
  required: ['id', 'dealer', 'players', 'createdAt'],
};

module.exports = {
  gameSchema,
};
