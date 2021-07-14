import RealmConfig from 'store';
import { assert, Message } from 'utils';

export default {
  handle: async ({ context, message, say }: Message) => {
    await RealmConfig.openRealm();
    assert('user' in message);
    const command = context.matches?.[1];
    switch (command) {
      case 'list':
        say(
          JSON.stringify(RealmConfig.realmRef.realm?.objects('ChessGame')) ??
            'no games found'
        );
        break;
      case 'list mine':
        say('list mine');
        break;
      default:
        say('missing command');
        break;
    }
    RealmConfig.closeRealm();
  },
};
