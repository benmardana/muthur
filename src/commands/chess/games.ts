import chessGameService, { nextTurn } from 'store/services/chessGameService';
import { Message } from 'utils';

export default {
  handle: async ({ say }: Message) => {
    const activeGames = chessGameService
      .all()
      .filter((game) => !game.game.game_over())
      .map((game) => `${game.id} - ${nextTurn(game)} to move`);

    await say(
      activeGames.length > 0
        ? `Active games:
${activeGames.join('\n')}`
        : "no games found :'("
    );
  },
};
