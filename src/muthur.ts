import { App } from '@slack/bolt';
import 'dotenv/config.js';
import { register } from './utils';

import commands from './commands';

const port = process.env.PORT ?? '3000';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

commands.forEach(register(app));

(async () => {
  await app.start(parseInt(port));
  console.log(`muthur is listening on port ${port}`);
})();
