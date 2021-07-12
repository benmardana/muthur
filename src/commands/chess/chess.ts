import { assert, Message } from 'utils';

export default {
  handle: async ({ message, say }: Message) => {
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
};
