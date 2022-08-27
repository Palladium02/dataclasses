import v8 from 'node:v8';
import assert from 'node:assert';

/**
 * A class describing the structure for the Dataclass.
 */
class Dataclass<T> {
  protected _data: T;

  /**
   * Constructor that creates an instance of a Dataclass.
   * @param data
   *
   * ```ts
   * interface IRectangle {
   *   height: number;
   *   width: number;
   * }
   *
   * class Rectangle extends Dataclass<IRectangle> {}
   *
   * let rectangle = new Rectangle({
   *   height: 10,
   *   width: 10,
   * });
   * ```
   */
  public constructor(data: T) {
    this._data = data;
  }

  /**
   * Getter method for all properties inside the Dataclass.
   * @param prop
   *
   * ```ts
   * let rectangle = new Rectangle({
   *   height: 10,
   *   width: 10,
   * });
   *
   * console.log(rectangle.get('width')); // <- will log 10
   * ```
   */
  public get<K extends keyof T>(prop: K) {
    return this._data[prop];
  }

  /**
   * Setter method for all properties inside the Dataclass.
   * @param prop
   * @param value
   *
   * ```ts
   * rectangle.set('width', 20);
   * console.log(rectangle.get('width')); // <- will now log 20
   * ```
   */
  public set<K extends keyof T>(prop: K, value: T[K]) {
    this._data[prop] = value;
  }

  /**
   * Setter method that allows for updating multiple values at once.
   * @param update
   *
   * ```ts
   * rectangle.update({
   *   height: 15,
   * });
   * ```
   */
  public update<K extends keyof T>(update: Partial<T>) {
    let keys = Object.keys(update) as K[];
    keys.forEach((key) => {
      this._data[key] = update[key]!;
    });
  }

  /**
   * Method that deep copies the data stored inside this instance and returns
   * a new one.
   *
   * ```ts
   * let anotherRectangle = rectangle.clone();
   * ```
   */
  public copy() {
    return new Dataclass<T>(v8.deserialize(v8.serialize(this._data)));
  }

  /**
   * Method that performs a deep and strict equality check on the data of
   * Dataclass instances.
   * @param other
   *
   * ```ts
   * console.log(rectangle.equals(anotherRectangle));
   * ```
   */
  public equals(other: Dataclass<T>) {
    try {
      assert.deepStrictEqual(this._data, other._data);
      return true;
    } catch (_error) {
      return false;
    }
  }

  /**
   * Method that returns a stringified version of the data stored inside this
   * instance.
   *
   * ```ts
   * console.log(rectangle.toString());
   * ```
   */
  public toString(): string {
    return `${this.constructor.name} ${JSON.stringify(this._data, null, 2)}`;
  }
}

export { Dataclass };
