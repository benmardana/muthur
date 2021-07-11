import openRealm from '../../store/realm';

import Model from '../Model';

interface Player {
  id: string;
  name: string;
}

class Player extends Model {
  public async save() {
    const realm = await openRealm();
    realm?.write(() => {
      realm?.create(
        'Player',
        {
          id: this.name,
          name: this.name,
        },
        Realm.UpdateMode.Modified
      );
    });
    realm?.close();
  }
}

export default Player;
