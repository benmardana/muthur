import {
  Middleware,
  SlackEventMiddlewareArgs,
  AllMiddlewareArgs,
} from '@slack/bolt';

export type Route = [
  string | RegExp,
  Middleware<SlackEventMiddlewareArgs<'message'>>
];
export type Message = SlackEventMiddlewareArgs<'message'> & AllMiddlewareArgs;
