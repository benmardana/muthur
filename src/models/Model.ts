import RealmConfig from 'store';

interface Model<T> {
  id: string;
  [key: string]: any;
}

export interface Schema {
  name: string;
  primaryKey: string;
  properties: Record<string, string>;
}

class Model<T extends Record<string, any>> {
  static Schema: Schema;

  constructor(data: T) {
    this.set(data);
  }

  get tag() {
    return `<@${this.id}>`;
  }

  public static async all<K>() {
    try {
      if (!this.Schema.name) {
        throw Error();
      }
      const objects = RealmConfig.realmRef.realm?.objects<K>(this.Schema.name);
      return objects
        ? objects.map(
            (object) => new this(Object.fromEntries(object.entries()) as K)
          )
        : undefined;
    } catch {
      console.error(`error while querying all ${this.Schema.name}s`);
    }
  }

  public static async find<K>(primaryKey: string) {
    try {
      if (!this.Schema.name) {
        throw Error();
      }
      const object = RealmConfig.realmRef.realm?.objectForPrimaryKey<K>(
        this.Schema.name,
        primaryKey
      );
      return object
        ? new this(Object.fromEntries(object.entries()) as K)
        : undefined;
    } catch {
      console.error(
        `Error while querying ${this.Schema.name}s by primary key ${primaryKey}.`
      );
    }
  }

  public static async findOrCreate<K>(primaryKey: string) {
    try {
      if (!this.Schema.name) {
        throw Error();
      }
      const object = await this.find<K>(primaryKey);

      return object ? object : new this<K>({ id: primaryKey } as unknown as K);
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
      const objects = RealmConfig.realmRef.realm
        ?.objects<K>(this.Schema.name)
        ?.filtered(predicate);
      return objects
        ? objects.map(
            (object) => new this(Object.fromEntries(object.entries()) as K)
          )
        : undefined;
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

  public async save(): Promise<Model<T> | undefined> {
    throw Error('Save method on Model not implemented');
  }
}

export default Model;
