import RealmConfig from 'store';
import { AnyMiddlewareArgs, Middleware } from '@slack/bolt';
import assert from 'assert';
import { User } from 'models';

const userResolver: Middleware<AnyMiddlewareArgs> = async ({
  payload,
  context,
  next,
}) => {
  RealmConfig.openRealm();
  assert('user' in payload);

  const slackUserId = payload.user;

  try {
    context.user = await (await User.findOrCreate(`<@${slackUserId}>`))?.save();
  } catch (error) {
    throw error;
  }

  await next?.();
};

export default userResolver;
