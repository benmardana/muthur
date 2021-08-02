import chessGameService, {
  ChessGame,
  fenToGif,
  nextTurn,
  sanToLan,
  squareInCheck,
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
        let check: string | undefined;

        // checkmate
        if (game.in_checkmate()) {
          // you win!
          check = squareInCheck(game);
          chessGameService.update(existingGame.id, { gameFen: game.fen() });
          await say('You win!');
          await say(
            fenToGif(game.fen(), { lastMove: sanToLan(result), check })
          );
          return;
        }

        // stalemate
        // draw
        // threefold repetition
        // insufficient material
        if (game.game_over()) {
          // draw
          chessGameService.update(existingGame.id, { gameFen: game.fen() });
          await say('Draw!');
          await say(fenToGif(game.fen(), { lastMove: sanToLan(result) }));
          return;
        }

        if (game.in_check()) {
          // check
          check = squareInCheck(game);
          chessGameService.update(existingGame.id, { gameFen: game.fen() });
          await say('Check!');
          await say(
            fenToGif(game.fen(), { lastMove: sanToLan(result), check })
          );
          return;
        }

        chessGameService.update(existingGame.id, { gameFen: game.fen() });
        await say(fenToGif(game.fen(), { lastMove: sanToLan(result), check }));
        return;
      }

      await say('Invalid move');
    } catch (e) {
      await say(e.message);
      return;
    }
  },
};
