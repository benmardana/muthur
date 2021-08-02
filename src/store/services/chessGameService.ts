import { Chess, ChessInstance, Move } from 'chess.js';
import shortUUID from 'short-uuid';
import realmInstance from 'store/realm';
import querystring from 'querystring';

const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

interface DBChessGame {
  id: string;
  black: string;
  white: string;
  gameFen: string;
}

export interface ChessGame {
  id: string;
  black: string;
  white: string;
  game: ChessInstance;
}

const transformDBInstanceToAppInstance: (
  dBChessGame: DBChessGame & Realm.Object
) => ChessGame = ({ gameFen, id, black, white }) => ({
  game: new Chess(gameFen),
  id,
  black,
  white,
});

export const sanToLan = ({ from, to }: Move) => `${from}${to}`;

export const fenToGif = (
  fen: string,
  options?: { flipBoard?: boolean; lastMove?: string }
) => {
  const [fenBoardState] = fen.split(' ');

  const queryParams = {
    fen: fenBoardState,
    orientation: options?.flipBoard ? 'black' : 'white',
    lastmove: options?.lastMove ? `&lastMove=${options.lastMove}` : '',
  };

  return `https://lila-gif.fly.dev/image.gif?${querystring.stringify(
    queryParams
  )}#${shortUUID.generate()}`;
};

export const nextTurn = (game: ChessGame) =>
  game.game.turn() === 'b' ? game.black : game.white;

export const opposition = (currentUser: string, game: ChessGame) =>
  game.white === currentUser ? game.black : game.white;

const find = (id: string) => {
  const instance = realmInstance.objectForPrimaryKey<DBChessGame>(
    'ChessGame',
    id
  );

  return instance ? transformDBInstanceToAppInstance(instance) : undefined;
};

const create = (
  id: string,
  { white, black }: { white: string; black: string }
) => {
  let newInstance: (DBChessGame & Realm.Object) | undefined;

  realmInstance.write(() => {
    newInstance = realmInstance.create<DBChessGame>('ChessGame', {
      id,
      black,
      white,
      gameFen: STARTING_FEN,
    });
  });

  return newInstance
    ? transformDBInstanceToAppInstance(newInstance)
    : undefined;
};

const update = (
  id: string,
  data?: { white?: string; black?: string; gameFen?: string }
) => {
  let newInstance: (DBChessGame & Realm.Object) | undefined;

  realmInstance.write(() => {
    realmInstance.create<DBChessGame>(
      'ChessGame',
      {
        id,
        ...data,
      },
      Realm.UpdateMode.Modified
    );
  });

  return newInstance
    ? transformDBInstanceToAppInstance(newInstance)
    : undefined;
};

const findOrCreate = (id: string, data: { white: string; black: string }) =>
  find(id) ?? create(id, data)!;

const all = () =>
  realmInstance
    .objects<DBChessGame>('ChessGame')
    .map(transformDBInstanceToAppInstance);

const findWhere = (predicate: string) =>
  realmInstance
    .objects<DBChessGame>('ChessGame')
    .filtered(predicate)
    .map(transformDBInstanceToAppInstance);

export default {
  find,
  create,
  update,
  findOrCreate,
  all,
  findWhere,
};
