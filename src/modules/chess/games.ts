import { openRealm } from '../../store';
import { assert, Message, Route } from '../../utils';

const games = [
  /^chess games (list|list mine)$/,
  async ({ context, message, say }: Message) => {
    assert('user' in message);
    const command = context.matches[1];
    switch (command) {
      case 'list':
        const realm = await openRealm();
        say(JSON.stringify(realm?.objects('ChessGame')));
        break;
      case 'list mine':
        say('list mine');
        break;
      default:
        say(command);
        break;
    }
  },
] as Route;

export default games;
