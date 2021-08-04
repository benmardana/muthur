import { Message } from 'utils';
import * as schema from 'store/schema';
import realmInstance from 'store';

const adminSidekicker = '<@U4TU0D3T2>';
const adminTest = '<@U027RRQ9EM6>';

export const goodBot = {
  handle: async ({ say }: Message) => {
    await say('🥰');
  },
};

export const badBot = {
  handle: async ({ say }: Message) => {
    await say('🥲');
  },
};

export default {
  handle: async ({ context, say }: Message) => {
    const command = context.matches?.[1];

    if (![adminSidekicker, adminTest].includes(context.user?.id ?? '')) {
      return;
    }

    switch (command) {
      case 'echo':
        await say('echo');
        break;
      case 'dump':
        const prettyString = Object.values(schema)
          .map(
            (t) =>
              `${t.name}s:\n\t${realmInstance
                ?.objects(t.name)
                .map((o) => JSON.stringify(o))
                .join('\n\t')}`
          )
          .join('\n');
        await say(prettyString);
        break;
      case 'clearAll':
        realmInstance.write(() => {
          realmInstance.deleteAll();
        });
        await say('All records cleared');
        break;
      default:
        await say('no command provided');
        break;
    }
  },
};
