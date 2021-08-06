import chessGameService, {
  ChessGame,
  fenToGif,
  nextTurn,
  relativeScore,
  sanToLan,
} from 'store/services/chessGameService';
import { assert, Message } from 'utils';
import { resolveOpponent } from './play';

export default {
  handle: async ({ say, context }: Message) => {
    try {
      const opponent = resolveOpponent(context.matches?.[1] || 'NULL');

      assert(context.user);

      const existingGame: ChessGame | undefined = chessGameService.findWhere(
        `id CONTAINS "${context.user.id} vs ${opponent.id}" || id CONTAINS "${opponent.id} vs ${context.user.id}"`
      )[0];

      if (!existingGame) {
        await say(
          'No game found - try challenging someone with `chess play @opponent`'
        );
        return;
      }

      const { game } = existingGame;

      await say(
        `${nextTurn(existingGame)} your turn! Score: ${relativeScore(game)}`
      );
      await say(
        fenToGif(game.fen(), {
          flipBoard: game.turn() === 'b',
        })
      );
      return;
    } catch (e) {
      await say(e.message);
      return;
    }
  },
};
