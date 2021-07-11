import { App } from '@slack/bolt';
import { Route } from 'utils';

const register =
  (app: App) =>
  ([pattern, callback]: Route) =>
    app.message(pattern, callback);

export default register;
