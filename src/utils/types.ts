import {
  AllMiddlewareArgs,
  Context,
  Middleware,
  SlackEventMiddlewareArgs,
} from '@slack/bolt';
import User from 'models/User';

export type Pattern = string | RegExp;
export type Message = SlackEventMiddlewareArgs<'message'> &
  AllMiddlewareArgs & {
    context: Context & { matches?: string[]; user?: User };
  };
export type MessageHandler = Middleware<SlackEventMiddlewareArgs<'message'>>;

export type Route = [
  Pattern,
  {
    handle: MessageHandler;
    help?: MessageHandler;
  } & Record<string, MessageHandler>
];
