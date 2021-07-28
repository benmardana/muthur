import { config } from 'store/realm';
import { PropertyInterface } from 'store/schema';
import assert from 'utils/assert';

interface Model<K extends PropertyInterface> {
  Schema?: {
    name?: string;
    primaryKey?: string;
    properties?: PropertyInterface;
    model?: K & Realm.Object;
    models?: Realm.Results<K & Realm.Object>;
  };
}

class Model<K extends PropertyInterface> {
  #realmInstance?: Realm;

  constructor() {
    this.#realmInstance = new Realm(config);
  }

  public all() {
    if (!this.Schema?.name) {
      throw Error();
    }

    this.Schema.models = this.#realmInstance?.objects<K>(this.Schema?.name);
    return this.Schema?.models;
  }

  public find(primaryKey: string) {
    if (!this.Schema?.name) {
      throw Error();
    }

    this.Schema.model = this.#realmInstance?.objectForPrimaryKey<K>(
      this.Schema?.name,
      primaryKey
    );
    return this.Schema?.model;
  }

  public findOrCreate(primaryKey: string) {
    if (!this.Schema?.name) {
      throw Error();
    }

    this.#realmInstance?.write(() => {
      assert(this.Schema?.name);

      // @ts-ignore
      this.Schema.model = this.#realmInstance.create<K>(
        this.Schema.name,
        {
          id: primaryKey,
        },
        Realm.UpdateMode.Modified
      );
    });
    return this.Schema.model;
  }

  public findWhere(predicate: string) {
    if (!this.Schema?.name) {
      throw Error();
    }

    this.Schema.models = this.all()?.filtered(predicate);
    return this.Schema.models;
  }
}

export default Model;
