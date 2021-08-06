import process from 'process';
import { MessageEvent, GenericMessageEvent } from '@slack/bolt';
import { Command } from 'commander';
import { assert, Message } from './utils';
import chessGameService, { nextTurn } from 'store/services/chessGameService';

const isGenericMessageEvent = (
  msg: MessageEvent
): msg is GenericMessageEvent => {
  return (msg as GenericMessageEvent).subtype === undefined;
};

const program = new Command().exitOverride();
program.command('help', { hidden: true });
program
  .command('dev', { hidden: true })
  .description('Top secret - MITTS OFF')
  .exitOverride();
const chess = program
  .command('chess')
  .description('Play a game of chess')
  .exitOverride();

export default async ({ message, say }: Message) => {
  program.configureOutput({
    writeOut: async (str) => await say(str),
    writeErr: async (str) => await say(str),
    outputError: (str) => console.warn(str),
  });

  program
    .command('muthur')
    .description('List commands')
    .action(async () => {
      await say(program.helpInformation());
    });

  chess
    .command('games')
    .description('List games')
    .action(async () => {
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
    });

  assert(isGenericMessageEvent(message));

  const input = message.text?.split(' ') ?? [];
  let argv = [process.argv[0], process.argv[1]];
  if (input?.length > 0) {
    argv = [...argv, ...input];
  }

  try {
    await program.parseAsync(argv);
  } catch {}
};
