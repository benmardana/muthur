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
  Check all active games with \`chess games\`
  
  Make a move in your active game with \`chess move <move>\`
  n.b moves should be in <https://en.wikipedia.org/wiki/Algebraic_notation_(chess)#Notation_for_moves|Standard Algebraic Notation>
          `,
    });
  },
};
