import { App } from '@slack/bolt';
import 'dotenv/config.js';

import { chess } from './modules';
import { register } from './utils';

const port = process.env.PORT ?? '3000';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const registerModule = register(app);

registerModule(chess);

(async () => {
  await app.start(parseInt(port));
  console.log(`muthur is listening on port ${port}`);
})();
