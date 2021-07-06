import { App } from '@slack/bolt';
import { Route } from 'utils';

const register = (app: App) => (routes: Route[]) =>
  routes.forEach(([pattern, callback]) => {
    app.message(pattern, callback);
  });

export default register;
