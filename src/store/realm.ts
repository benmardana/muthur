import openRealm from 'realm';
import { Frame, ChessGame, Player } from './schema';

export default async () => {
  let realm: openRealm;
  try {
    realm = await openRealm.open({
      path: 'realm',
      schema: [Frame, ChessGame, Player],
    });
    return realm;
  } catch (err) {
    console.error('Failed to open the realm', err.message);
  }
};
