import openRealm from 'realm';
import { Frame, ChessGame, User } from './schema';

const realmPath = 'realm/realm';

export const config = {
  path: realmPath,
  schema: [Frame, ChessGame, User],
};

const realmRef: { realm?: Realm } = {
  realm: undefined,
};

export default {
  realmRef: realmRef,
  openRealm: async () => {
    realmRef.realm = await openRealm.open(config);
  },
  closeRealm: async () => {
    realmRef.realm = realmRef.realm?.close() || undefined;
  },
};
