import { App } from '@slack/bolt';
import Chess from './controllers/chess';
import 'dotenv/config.js';

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const port = process.env.PORT ?? 3000;

Chess.register(app);

(async () => {
  // Start your app
  // @ts-ignore
  await app.start(port);

  console.log(`muthur is listening on port ${port}`);
})();
