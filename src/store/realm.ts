import openRealm from 'realm';
import { Frame, ChessGame, User } from './schema';

const realmPath = 'realm/realm';

const config = {
  path: realmPath,
  schema: [Frame, ChessGame, User],
};

export default async () => {
  try {
    return await openRealm.open(config);
  } catch (err) {
    console.error('Failed to open the realm', err.message);
  }
};
