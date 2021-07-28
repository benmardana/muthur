export interface PropertyInterface {
  id: string;
}

export const Frame = {
  name: 'Frame',
  properties: {
    id: 'string',
    fen: 'string?',
    playerId: 'string?',
    lastMove: 'string?',
    timestamp: 'string?',
  },
  primaryKey: 'id',
};

export const ChessGame = {
  name: 'ChessGame',
  properties: {
    id: 'string',
    playerOneId: 'string?',
    playerTwoId: 'string?',
    frames: 'Frame[]',
    nextMoveUserId: 'string?',
  },
  primaryKey: 'id',
};

export const User = {
  name: 'User',
  properties: {
    id: 'string',
    chessGames: 'ChessGame[]',
  },
  primaryKey: 'id',
};
