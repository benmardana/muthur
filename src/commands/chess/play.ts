import RealmConfig from 'store';
import ChessGame from 'models/ChessGame';
import User from 'models/User';
import { assert, Message } from 'utils';
import { SayFn } from '@slack/bolt';

const tagRegex = /(<@.*>)/;

const resolveOpponent = async (say: SayFn, argument?: string) => {
  if (!argument) {
    await say(
      `Couldn't find opponent. Try tagging the person you want to challenge.`
    );
    return;
  }

  const taggedOpponent = tagRegex.exec(argument)?.[1];

  if (!taggedOpponent) {
    await say(
      `Couldn't find ${argument}. Try tagging the person you want to challenge.`
    );
    return;
  }

  return new User(taggedOpponent);
};

const realmTransaction = async (transaction: (...args: any[]) => void) => {
  await RealmConfig.openRealm();
  RealmConfig.realmRef.realm?.write(() => {
    transaction();
  });
  RealmConfig.closeRealm();
};

export default {
  handle: async ({ context, say }: Message) => {
    const arg = context.matches?.[1];

    const opponent = await resolveOpponent(say, arg);

    const playerOneId = context?.user?.Schema?.model?.id;
    const playerTwoId = opponent?.Schema?.model?.id;
    const game = new ChessGame(`${playerOneId}&${playerTwoId}`);

    await realmTransaction(() => {
      assert(game.Schema?.model);
      game.Schema.model.nextMoveUserId = playerOneId!;
      game.Schema.model.playerOneId = playerOneId!;
      game.Schema.model.playerTwoId = playerTwoId!;
      say(JSON.stringify(game.Schema?.model));
    });
  },
};
