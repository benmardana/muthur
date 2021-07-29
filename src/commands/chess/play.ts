import { assert, Message } from 'utils';
import userService from 'store/services/userService';
import chessGameService, { fenToGif } from 'store/services/chessGameService';
import { Chess } from 'chess.js';

const tagRegex = /(<@.*>)/;

const resolveOpponent = (argument?: string) => {
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

      const playerOneId = context.user.id;
      const playerTwoId = opponent.id;
      const primaryKey = `${playerOneId}&${playerTwoId}`;

      const existingGame = chessGameService.find(primaryKey);
      if (existingGame) {
        say(
          `Game already exists - ${
            existingGame.game.turn() === 'b'
              ? existingGame.black
              : existingGame.white
          } it's your turn!`
        );
        say(fenToGif(existingGame.game.fen()));
        return;
      }

      const newGame = chessGameService.create(primaryKey, {
        white: playerOneId,
        black: playerTwoId,
      })!;

      say(
        `New game created - ${
          newGame.game.turn() === 'b' ? newGame.black : newGame.white
        } it's your turn!`
      );
      say(fenToGif(newGame.game.fen()));
    } catch (e) {
      say(e.message);
      return;
    }
  },
};
