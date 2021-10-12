# MU/TH/UR

Slackbot

```
Priority one
Insure return of organism for analysis.
All other considerations secondary.
Crew expendable.
```

- language: [typescript](https://www.typescriptlang.org)
- runtime: [node.js](https://nodejs.org)
- application: [slack/bolt](https://github.com/slackapi/bolt-js)
- db: [realm.io](https://docs.mongodb.com/realm/sdk/node/)
- hosting: [fly.io](https://fly.io/)

## Requirements

- `node:14.17.3`
- `npm`
- [`ngrok`](https://ngrok.com/)
- [`flyctl`](https://fly.io/docs/flyctl/installing/)
- also depends on [lila-gif](https://github.com/benmcgarvey/lila-gif) being live at https://lila-gif.fly.dev/ for the generated chess board gifs

## Installation

```bash
npm install
```

## Development

Start up the application with

```bash
npm run muthur
```

Nodemon will watch for changes to `src/` and perform hot-reloads when necessary

Slack requires a public url to send events for the app to respond to. You can use ngrok to forward your application to the public internet.

In another terminal session:

```bash
ngrok http 3000
```

You'll see something like the following:

```
Session Status                online
Session Expires               1 hour, 59 minutes
Version                       2.3.35
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://xxx.ngrok.io -> http://localhost:3000
Forwarding                    https://xxx.ngrok.io -> http://localhost:3000
```

The HTTPS address is the one you need to give to slack to enable event subscriptions - at the time of writing, the url also requires `/slack/events` to be appended to the end

## Deployment

Muthur uses fly.io for hosting and persistence

Before deployment, we need to set up a volume to persist storage between restarts, and store our slack secrets for our app to use when it goes live

Create a persistent volume:

```
flyctl volumes create realm --region syd --size 10
```

Then setup secrets:

```
flyctl secrets set SLACK_SIGNING_SECRET=abc123 SLACK_BOT_TOKEN=def456
```

The application can now be deployed with:

```bash
flyctl deploy
```

Muthur is now live at your given fly io url, view the hostname with `flyctl info` and paste the https address into slack to connect to the running application.

## Contributing

Pull requests are welcome.

## License

[ISC](https://choosealicense.com/licenses/isc/)
