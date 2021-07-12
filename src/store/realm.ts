import { join } from 'path';
import openRealm from 'realm';
import { Frame, ChessGame, User } from './schema';

const homeDir = process.env.NODE_ENV === 'production' ? process.env.HOME : '';
const realmPath = 'realm';

if (homeDir === undefined) {
  throw Error('$HOME not set');
}

const config = {
  path: join(homeDir, realmPath),
  schema: [Frame, ChessGame, User],
};

export default async () => {
  try {
    return await openRealm.open(config);
  } catch (err) {
    console.error('Failed to open the realm', err.message);
  }
};
