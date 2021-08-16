import commands from './commands';
import Chess from './chess';
import dev, { badBot, goodBot } from './dev';
import cute from './emergency/cute';

export default commands
  .add([/^dev(?:$|[\s]+(.*))$/, dev])
  .add([/^good muthur$/, goodBot])
  .add([/^bad muthur$/, badBot])
  .add([/^chess$/, Chess.chess])
  .add([/^chess play(?:$|[\s]+(.*))$/, Chess.play])
  .add([/^chess (<@.*>) move(?:$|[\s]+(.*))$/, Chess.move])
  .add([/^chess (<@.*>) moves$/, Chess.moves])
  .add([/^chess games$/, Chess.games])
  .add([/^chess (<@.*>) game$/, Chess.game])
  .add([/^emergency cute$/, cute]);
