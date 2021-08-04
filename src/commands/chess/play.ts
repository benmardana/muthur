import { assert, Message } from 'utils';
import userService from 'store/services/userService';
import chessGameService, {
  ChessGame,
  fenToGif,
  nextTurn,
  opposition,
} from 'store/services/chessGameService';

const tagRegex = /(<@.*>)/;

export const resolveOpponent = (argument?: string) => {
  if (!argument) {
    throw new Error(
      "Couldn't find opponent. Try tagging the person you want to challenge."
    );
  }

  const taggedOpponent = tagRegex.exec(argument)?.[1];

  if (!taggedOpponent) {
    throw new Error(
      `Couldn't find ${argument}. Try tagging the person you want to challenge.`
    );
  }

  return userService.findOrCreate(taggedOpponent);
};

export default {
  handle: async ({ context, say }: Message) => {
    const arg = context.matches?.[1];

    try {
      assert(context.user);
      const opponent = resolveOpponent(arg);

      const existingGame: ChessGame | undefined = chessGameService.findWhere(
        `id CONTAINS "${context.user.id} vs ${opponent.id}"`
      )[0];

      if (existingGame) {
        await say(
          `You already have a game with ${opposition(
            context.user.id,
            existingGame
          )} - ${nextTurn(existingGame)} it's your turn!`
        );
        await say(fenToGif(existingGame.game.fen()));
        return;
      }

      const newGame = chessGameService.create(
        `${context.user.id} vs ${opponent.id}`,
        {
          white: context.user.id,
          black: opponent.id,
        }
      )!;

      await say(`New game created - ${nextTurn(newGame)} it's your turn!`);
      await say(fenToGif(newGame.game.fen()));
    } catch (e) {
      await say(e.message);
      return;
    }
  },
};
