import { Message } from 'utils';
import * as schema from 'store/schema';
import realmInstance from 'store';

export default {
  handle: async ({ context, say }: Message) => {
    const command = context.matches?.[1];

    switch (command) {
      case 'echo':
        say('echo');
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
        say(prettyString);
        break;
      case 'clearAll':
        realmInstance.write(() => {
          realmInstance.deleteAll();
        });
        say('All records cleared');
        break;
      default:
        say('no command provided');
        break;
    }
  },
};
