import realmInstance from 'store/realm';

export interface User {
  id: string;
}

const find = (id: string) =>
  realmInstance.objectForPrimaryKey<User>('User', id);

const create = (id: string) => {
  let newInstance: (User & Realm.Object) | undefined;

  realmInstance.write(() => {
    newInstance = realmInstance.create<User>('User', {
      id,
    });
  });

  return newInstance;
};

const findOrCreate = (id: string) => find(id) ?? create(id)!;

export default {
  find,
  create,
  findOrCreate,
};
