export const Frame = {
  name: 'Frame',
  properties: {
    id: 'string',
    fen: 'string',
    player: 'Player',
    lastMove: 'string',
    timestamp: 'string',
  },
  primaryKey: 'id',
};

export const ChessGame = {
  name: 'ChessGame',
  properties: {
    id: 'string',
    playerOne: 'Player',
    playerTwo: 'Player',
    frames: 'Frame[]',
    nextMovePlayer: 'Player',
  },
  primaryKey: 'id',
};

export const Player = {
  name: 'Player',
  properties: {
    id: 'string',
    name: 'string',
    chessGames: 'ChessGame[]',
  },
  primaryKey: 'id',
};
