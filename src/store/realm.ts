import Realm from 'realm';
import { ChessGame, User } from './schema';

const realmInstance = new Realm({
  path: 'realm/realm',
  schema: [ChessGame, User],
});

export default realmInstance;
