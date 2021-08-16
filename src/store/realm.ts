import Realm from 'realm';
import { ChessGame, Photo, User } from './schema';

const realmInstance = new Realm({
  path: 'realm/realm',
  schema: [ChessGame, User, Photo],
});

export default realmInstance;
