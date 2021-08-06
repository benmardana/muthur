import {
  AllMiddlewareArgs,
  Context,
  Middleware,
  SlackEventMiddlewareArgs,
} from '@slack/bolt';
import { User } from 'store/services/userService';

export type Pattern = string | RegExp;
export type Message = SlackEventMiddlewareArgs<'message'> &
  AllMiddlewareArgs & {
    context: Context & {
      matches?: string[];
      user?: User & Realm.Object;
    };
  };
export type MessageHandler = Middleware<SlackEventMiddlewareArgs<'message'>>;

export type Route = [
  Pattern,
  {
    handle: MessageHandler;
    help?: MessageHandler;
  } & Record<string, MessageHandler>
];
