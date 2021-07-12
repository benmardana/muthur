import { assert, Message } from 'utils';

const tagRegex = /(<@.*>)/;

export default {
  handle: async ({ context, message, say }: Message) => {
    assert('user' in message);
    const arg = context.matches[1];
    const opponent = tagRegex.exec(arg)?.[1];

    if (!opponent) {
      await say(
        `Couldn't find ${arg}. Try tagging the person you want to challenge.`
      );
      return;
    }

    await say(opponent);
  },
};
