import { App } from '@slack/bolt';
import 'dotenv/config.js';

import { userResolver } from 'middleware';
import commands from './commands';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.use(userResolver);

// commands.forEach(register(app));

app.message(/.*/, commands);

(async () => {
  await app.start(3000);
  console.log(`muthur is listening on port ${3000}`);
})();
