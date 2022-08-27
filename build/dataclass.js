"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dataclass = void 0;
const node_v8_1 = __importDefault(require("node:v8"));
const node_assert_1 = __importDefault(require("node:assert"));
class Dataclass {
    constructor(data) {
        this._data = data;
    }
    get(prop) {
        return this._data[prop];
    }
    set(prop, value) {
        this._data[prop] = value;
    }
    update(update) {
        let keys = Object.keys(update);
        keys.forEach((key) => {
            this._data[key] = update[key];
        });
    }
    copy() {
        return new Dataclass(node_v8_1.default.deserialize(node_v8_1.default.serialize(this._data)));
    }
    equals(other) {
        try {
            node_assert_1.default.deepStrictEqual(this._data, other._data);
            return true;
        }
        catch (_error) {
            return false;
        }
    }
    toString() {
        return `${this.constructor.name} ${JSON.stringify(this._data, null, 2)}`;
    }
}
exports.Dataclass = Dataclass;
