import Realm from 'realm';

// move to schema dir
const Frame = {
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

const ChessGame = {
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

const Player = {
  name: 'Player',
  properties: {
    id: 'string',
    name: 'string',
    chessGames: 'ChessGame[]',
  },
  primaryKey: 'id',
};

// probably convert to class?
const openRealm = async () => {
  let realm: Realm;
  try {
    realm = await Realm.open({
      path: 'realm',
      schema: [Frame, ChessGame, Player],
    });
    return realm;
  } catch (err) {
    console.error('Failed to open the realm', err.message);
  }
};

export default openRealm;
