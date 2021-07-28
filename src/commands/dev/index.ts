import RealmConfig from 'store';
import { Message } from 'utils';
import * as schema from 'store/schema';

export default {
  handle: async ({ context, say }: Message) => {
    await RealmConfig.openRealm();
    const command = context.matches?.[1];

    switch (command) {
      case 'dump':
        const prettyString = Object.values(schema)
          .map(
            (t) =>
              `${t.name}s:\n\t${RealmConfig.realmRef.realm
                ?.objects(t.name)
                .map((o) => JSON.stringify(o))
                .join('\n\t')}`
          )
          .join('\n');
        say(prettyString);
        break;
      case 'clearAll':
        RealmConfig.realmRef.realm?.write(() => {
          RealmConfig.realmRef.realm?.deleteAll();
        });
        say('All records cleared');
        break;
      default:
        say('no command provided');
        break;
    }

    RealmConfig.closeRealm();
  },
};
