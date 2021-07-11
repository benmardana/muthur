interface Model {
  id: string;
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
