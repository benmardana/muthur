export const Frame = {
  name: 'Frame',
  properties: {
    id: 'string',
    fen: 'string',
    player: 'User',
    lastMove: 'string',
    timestamp: 'string',
  },
  primaryKey: 'id',
};

export const ChessGame = {
  name: 'ChessGame',
  properties: {
    id: 'string',
    playerOne: 'User',
    playerTwo: 'User',
    frames: 'Frame[]',
    nextMoveUser: 'User',
  },
  primaryKey: 'id',
};

export const User = {
  name: 'User',
  properties: {
    id: 'string',
    name: 'string',
    chessGames: 'ChessGame[]',
  },
  primaryKey: 'id',
};
