"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dataclass = void 0;
const node_v8_1 = __importDefault(require("node:v8"));
const node_assert_1 = __importDefault(require("node:assert"));
/**
 * A class describing the structure for the Dataclass.
 */
class Dataclass {
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
    constructor(data) {
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
    get(prop) {
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
    set(prop, value) {
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
    update(update) {
        let keys = Object.keys(update);
        keys.forEach((key) => {
            this._data[key] = update[key];
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
    copy() {
        return new Dataclass(node_v8_1.default.deserialize(node_v8_1.default.serialize(this._data)));
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
    equals(other) {
        try {
            node_assert_1.default.deepStrictEqual(this._data, other._data);
            return true;
        }
        catch (_error) {
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
    toString() {
        return `${this.constructor.name} ${JSON.stringify(this._data, null, 2)}`;
    }
}
exports.Dataclass = Dataclass;
