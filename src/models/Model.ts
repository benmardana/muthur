import { openRealm } from 'store';

interface Model<T> {
  id: string;
  [key: string]: any;
}

interface Schema {
  name: string;
  primaryKey: string;
  properties: Record<string, string>;
}

class Model<T extends Record<string, any>> {
  static Schema: Schema;

  constructor(data: T) {
    this.set(data);
  }

  public static async all<K>() {
    try {
      if (!this.Schema.name) {
        throw Error();
      }
      const realm = await openRealm();
      return realm?.objects<K>(this.Schema.name);
    } catch {
      console.error(`error while querying all ${this.Schema.name}s`);
    }
  }

  public static async find<K>(primaryKey: string) {
    try {
      if (!this.Schema.name) {
        throw Error();
      }
      const realm = await openRealm();
      return realm?.objectForPrimaryKey<K>(this.Schema.name, primaryKey);
    } catch {
      console.error(
        `Error while querying ${this.Schema.name}s by primary key ${primaryKey}.`
      );
    }
  }

  public static async findWhere<K>(predicate: string) {
    try {
      if (!this.Schema.name) {
        throw Error();
      }
      return (await this.all<K>())?.filtered(predicate);
    } catch {
      console.error(
        `Error while querying ${this.Schema.name}s.
         Query: ${predicate}`
      );
    }
  }

  public set(data: T) {
    Object.entries(data).forEach(([k, v]) => {
      this[k] = v;
    });

    return this;
  }

  public async save(): Promise<this> {
    throw Error('Save method on Model not implemented');
  }
}

export default Model;
