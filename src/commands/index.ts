import commands from './commands';
import Chess from './chess';
import dev from './dev';

export default commands
  .add([/^dev(?:$|[\s]+(.*))$/, dev])
  .add([/^chess$/, Chess.chess])
  .add([/^chess play(?:$|[\s]+(.*))$/, Chess.play])
  .add([/^chess move(?:$|[\s]+(.*))$/, Chess.move])
  .add([/^chess moves$/, Chess.moves])
  .add([/^chess games$/, Chess.games]);
