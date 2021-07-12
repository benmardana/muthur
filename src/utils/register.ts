import { App } from '@slack/bolt';
import { Route } from './types';

const register =
  (app: App) =>
  ([pattern, { handle, help }]: Route) => {
    app.message(pattern, handle);
    help && app.message(pattern, help);
  };

export default register;
