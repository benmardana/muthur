import chessGameService, {
  ChessGame,
  fenToGif,
  nextTurn,
  sanToLan,
} from 'store/services/chessGameService';
import { assert, Message } from 'utils';

export default {
  handle: async ({ say, context }: Message) => {
    const move = context.matches?.[1] || 'NULL';

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

      const result = game.move(move, { sloppy: true });

      if (result) {
        chessGameService.update(existingGame.id, { gameFen: game.fen() });

        // Check for check
        // Check for win
        // Check for draw
        // Check for stalemate

        await say('Successful move!');
        await say(fenToGif(game.fen(), { lastMove: sanToLan(result) }));
        return;
      }

      await say('Invalid move');
    } catch (e) {
      await say(e.message);
      return;
    }
  },
};
