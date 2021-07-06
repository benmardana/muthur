import {
  AllMiddlewareArgs,
  App,
  Middleware,
  SlackEventMiddlewareArgs,
} from '@slack/bolt';
import assert from '../assert';

// to move
type Route = [string | RegExp, Middleware<SlackEventMiddlewareArgs<'message'>>];
type Message = SlackEventMiddlewareArgs<'message'> & AllMiddlewareArgs;

const index = [
  /^chess$/,
  async ({ message, say }: Message) => {
    assert('user' in message);
    await say({
      unfurl_links: false,
      unfurl_media: false,
      text: `
Want to play chess <@${message.user}>?

Challenge someone with \`chess play @opponent\`
Check all active games with \`chess games list\`
Check your active games with \`chess games list mine\`

Show an active game with \`chess game @opponent\`

Make a move in an active game with \`chess game @opponent move <move>\`
n.b moves should be in <https://en.wikipedia.org/wiki/Algebraic_notation_(chess)#Notation_for_moves|Standard Algebraic Notation>
          `,
    });
  },
] as Route;

const routes: Route[] = [index];

export default {
  register: (app: App) => {
    routes.forEach(([pattern, callback]) => {
      app.message(pattern, callback);
    });
  },
};
