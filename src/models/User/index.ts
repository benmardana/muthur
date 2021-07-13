import { openRealm } from 'store';
import { User as UserSchema } from 'store/schema';

import Model, { Schema } from '../Model';

interface User {
  id: string;
  name: string;
}

class User extends Model<User> {
  static Schema: Schema = UserSchema;

  get tag() {
    return `<@${this.name}>`;
  }

  public static async all<K = User>() {
    return super.all<K>();
  }

  public static async find<K = User>(primaryKey: string) {
    return super.find<K>(primaryKey);
  }

  public static async findOrCreate<K = User>(primaryKey: string) {
    return super.findOrCreate<K>(primaryKey);
  }

  public static async findWhere<K = User>(predicate: string) {
    return super.findWhere<K>(predicate);
  }

  public async save() {
    const realm = await openRealm();
    realm?.write(() => {
      realm?.create(
        'User',
        {
          id: this.id,
          name: this.id,
        },
        Realm.UpdateMode.Modified
      );
    });
    realm?.close();

    return User.find(this.id);
  }
}

export default User;
