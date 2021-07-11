import openRealm from '../../store/realm';
import Player from '../../models/Player/player';
import { assert, Message, Route } from '../../utils';

const test = [
  /^testing$/,
  async ({ message, say }: Message) => {
    assert('user' in message);
    await say('testing');
    const testGameModel = await Player.from({
      name: message.user,
    });
    await testGameModel.save();
    const players = (await openRealm())?.objects('Player');
    console.log(`players: ${JSON.stringify(players)}`);
    await say(`players: ${JSON.stringify(players)}`);
  },
] as Route;

export default test;
