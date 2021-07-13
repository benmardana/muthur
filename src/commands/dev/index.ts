import { openRealm } from 'store';
import { Message } from 'utils';
import * as schema from 'store/schema';

export default {
  handle: async ({ context, say }: Message) => {
    const command = context.matches?.[1];

    switch (command) {
      case 'dump':
        const realm = await openRealm();
        const prettyString = Object.values(schema)
          .map(
            (t) =>
              `${t.name}s:\n\t${realm
                ?.objects(t.name)
                .map((o) => JSON.stringify(o))
                .join('\n\t')}`
          )
          .join('\n');
        say(prettyString);
        break;
      default:
        say('no command provided');
        break;
    }
  },
};
