import v8 from 'node:v8';
import assert from 'node:assert';

class Dataclass<T> {
  protected _data: T;
  public constructor(data: T) {
    this._data = data;
  }

  public get<K extends keyof T>(prop: K) {
    return this._data[prop];
  }

  public set<K extends keyof T>(prop: K, value: T[K]) {
    this._data[prop] = value;
  }

  public update<K extends keyof T>(update: Partial<T>) {
    let keys = Object.keys(update) as K[];
    keys.forEach((key) => {
      this._data[key] = update[key]!;
    });
  }

  public copy() {
    return new Dataclass<T>(v8.deserialize(v8.serialize(this._data)));
  }

  public equals(other: Dataclass<T>) {
    try {
      assert.deepStrictEqual(this._data, other._data);
      return true;
    } catch (_error) {
      return false;
    }
  }

  public toString() {
    return `${this.constructor.name} ${JSON.stringify(this._data, null, 2)}`;
  }
}

export { Dataclass };
