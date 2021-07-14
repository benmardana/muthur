import {
  AllMiddlewareArgs,
  Context,
  Middleware,
  SlackEventMiddlewareArgs,
} from '@slack/bolt';
import { User } from 'models';
import Model from 'models/Model';

export type Pattern = string | RegExp;
export type Message = SlackEventMiddlewareArgs<'message'> &
  AllMiddlewareArgs & {
    context: Context & { matches?: string[]; user?: Model<User> };
  };
export type MessageHandler = Middleware<SlackEventMiddlewareArgs<'message'>>;

export type Route = [
  Pattern,
  {
    handle: MessageHandler;
    help?: MessageHandler;
  } & Record<string, MessageHandler>
];
