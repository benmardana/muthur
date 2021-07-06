import { assert } from 'console';
import Model from '../../models/Model';
import { Message, Route } from '../../utils';

const test = [
  /^testing$/,
  async ({ message, say }: Message) => {
    assert('user' in message);
    await say('testing');
    const testGameModel = await Model.from({
      key: 'game',
      uuid: 'abcd',
    });
    await testGameModel.save();
  },
] as Route;

export default test;
