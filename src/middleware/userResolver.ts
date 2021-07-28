import { AnyMiddlewareArgs, Middleware } from '@slack/bolt';
import assert from 'assert';
import { User } from 'models';

const userResolver: Middleware<AnyMiddlewareArgs> = async ({
  payload,
  context,
  next,
}) => {
  assert('user' in payload);

  context.user = new User(`<@${payload.user}>`);

  await next?.();
};

export default userResolver;
