import commands from './commands';
import Chess from './chess';

export default commands
  .add([/^chess$/, Chess.chess])
  .add([/^chess games(?:$|[\s]+(.*))$/, Chess.games]);
