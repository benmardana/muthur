export interface PropertyInterface {
  id: string;
}

export const ChessGame = {
  name: 'ChessGame',
  properties: {
    id: 'string',
    black: 'string',
    white: 'string',
    gameFen: 'string',
  },
  primaryKey: 'id',
};

export const User = {
  name: 'User',
  properties: {
    id: 'string',
  },
  primaryKey: 'id',
};
