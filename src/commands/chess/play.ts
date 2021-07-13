import { assert, Message } from 'utils';

const tagRegex = /(<@.*>)/;

export default {
  handlex: async ({ context, message, say }: Message) => {
    assert('user' in message);
    const arg = context.matches?.[1];

    if (!arg) {
      await say(
        `Couldn't find opponent. Try tagging the person you want to challenge.`
      );
      return;
    }

    const taggedOpponent = tagRegex.exec(arg)?.[1];

    if (!taggedOpponent) {
      await say(
        `Couldn't find ${arg}. Try tagging the person you want to challenge.`
      );
      return;
    }

    await say(taggedOpponent);
  },
  handle: async ({ context, say }: Message) => {
    await say(context.user?.tag!);
  },
};
