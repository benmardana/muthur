import CommandBuilder from './CommandBuilder';

import { root, games } from './chess';

const commands = new CommandBuilder()
  .add([/^chess$/, root])
  .add([/^chess games(?:$|[\s]+(.*))$/, games])
  .add([/^chess game(?:$|[\s]+(.*))$/, root]);

export default commands;
