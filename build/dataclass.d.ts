/**
 * A class describing the structure for the Dataclass.
 */
declare class Dataclass<T> {
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
    constructor(data: T);
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
    get<K extends keyof T>(prop: K): T[K];
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
    set<K extends keyof T>(prop: K, value: T[K]): void;
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
    update<K extends keyof T>(update: Partial<T>): void;
    /**
     * Method that deep copies the data stored inside this instance and returns
     * a new one.
     *
     * ```ts
     * let anotherRectangle = rectangle.clone();
     * ```
     */
    clone(): Dataclass<T>;
    /**
     * Method that performs a deep and strict equality check on the data of
     * Dataclass instances.
     * @param other
     *
     * ```ts
     * console.log(rectangle.equals(anotherRectangle));
     * ```
     */
    equals(other: Dataclass<T>): boolean;
    /**
     * Method that returns a stringified version of the data stored inside this
     * instance.
     *
     * ```ts
     * console.log(rectangle.toString());
     * ```
     */
    toString(): string;
}
export { Dataclass };
