import { AnyMiddlewareArgs, Middleware } from '@slack/bolt';
import assert from 'assert';
import userService from 'store/services/userService';

const userResolver: Middleware<AnyMiddlewareArgs> = async ({
  payload,
  context,
  next,
}) => {
  if ('subtype' in payload && payload.subtype === 'message_changed') {
    return;
  }

  assert('user' in payload);

  context.user = userService.findOrCreate(`<@${payload.user}>`);

  await next?.();
};

export default userResolver;
