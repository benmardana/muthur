import openRealm from '../../store/realm';

import Model from '../Model';

interface User {
  id: string;
  name: string;
}

class User extends Model<User> {
  public static async all<K = User>() {
    return super.all<K>();
  }

  public async save() {
    const realm = await openRealm();
    realm?.write(() => {
      realm?.create(
        'User',
        {
          id: this.name,
          name: this.name,
        },
        Realm.UpdateMode.Modified
      );
    });
    realm?.close();

    return this;
  }
}

export default User;
