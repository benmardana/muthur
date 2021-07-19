import RealmConfig from 'store';
import ChessGame from 'models/ChessGame';
import User from 'models/User';
import { Message } from 'utils';

const tagRegex = /(<@.*>)/;

export default {
  handle: async ({ context, say }: Message) => {
    await RealmConfig.openRealm();
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

    const opponent = await (await User.findOrCreate(taggedOpponent))?.save();

    const id = `${context?.user?.id}&${opponent?.id}`;

    const game = await ChessGame.findOrCreate(id);

    game?.set({
      id,
      playerOneId: context?.user?.id!,
      playerTwoId: opponent?.id!,
      nextMoveUserId: context?.user?.id!,
    });
    await game?.save();

    await say(JSON.stringify(game));
    RealmConfig.closeRealm();
  },
};
