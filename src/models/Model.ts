import { Data } from '../store/db';

interface Model {
  key: keyof Data;
  uuid: string;
  [key: string]: any;
}

class Model {
  static from(data: any): Model {
    return new this().set(data);
  }

  public set(data: Record<string, any>) {
    Object.entries(data).forEach(([k, v]) => {
      this[k] = v;
    });

    return this;
  }

  public async save() {}
}

export default Model;
