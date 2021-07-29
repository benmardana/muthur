import { Chess, ChessInstance } from 'chess.js';
import shortUUID from 'short-uuid';
import realmInstance from 'store/realm';

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

export const fenToGif = (fen: string) =>
  `https://lila-gif.fly.dev/image.gif?fen=${fen.substring(
    0,
    fen.indexOf(' ')
  )}#${shortUUID.generate()}`;

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

const findOrCreate = (id: string, data: { white: string; black: string }) =>
  find(id) ?? create(id, data)!;

export default {
  find,
  create,
  findOrCreate,
};
