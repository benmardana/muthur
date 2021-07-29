import Realm from 'realm';
import { ChessGame, User } from './schema';

const realmPath = 'realm/realm';

export const config = {
  path: realmPath,
  schema: [ChessGame, User],
};

const realmInstance = new Realm(config);

export default realmInstance;
