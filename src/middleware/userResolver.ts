import { AnyMiddlewareArgs, Middleware } from '@slack/bolt';
import assert from 'assert';
import User from 'models/User';

const userResolver: Middleware<AnyMiddlewareArgs> = async ({
  payload,
  context,
  next,
}) => {
  assert('user' in payload);

  const slackUserId = payload.user;

  try {
    const user = await User.findOrCreate(slackUserId);
    context.user = await user?.save();
  } catch (error) {
    throw error;
  }

  await next?.();
};

export default userResolver;
