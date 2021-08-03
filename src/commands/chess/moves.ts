import chessGameService, {
  ChessGame,
  nextTurn,
} from 'store/services/chessGameService';
import { assert, Message } from 'utils';

export default {
  handle: async ({ say, context }: Message) => {
    try {
      assert(context.user);
      const existingGame: ChessGame | undefined = chessGameService.findWhere(
        `id CONTAINS "${context.user.id}"`
      )[0];

      if (!existingGame) {
        await say(
          'No game found - try challenging someone with `chess play @opponent`'
        );
        return;
      }

      const { game } = existingGame;

      if (nextTurn(existingGame) !== context.user.id) {
        await say("It's not your turn!");
        return;
      }

      // strip check indicators
      await say(
        `Available moves: ${game
          .moves()
          .map((move) => move.replace(/[+#]/, ''))
          .join(', ')}`
      );
    } catch (e) {
      await say(e.message);
      return;
    }
  },
};
