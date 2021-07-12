import {
  AllMiddlewareArgs,
  Middleware,
  SlackEventMiddlewareArgs,
} from '@slack/bolt';

export type Pattern = string | RegExp;
export type Message = SlackEventMiddlewareArgs<'message'> & AllMiddlewareArgs;
export type MessageHandler = Middleware<SlackEventMiddlewareArgs<'message'>>;

export type Route = [
  Pattern,
  {
    handle: MessageHandler;
    help?: MessageHandler;
  } & Record<string, MessageHandler>
];
