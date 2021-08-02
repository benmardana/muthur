import { Message } from 'utils';
import * as schema from 'store/schema';
import realmInstance from 'store';

export default {
  handle: async ({ context, say }: Message) => {
    const command = context.matches?.[1];

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
