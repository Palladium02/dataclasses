declare class Dataclass<T> {
    protected _data: T;
    constructor(data: T);
    get<K extends keyof T>(prop: K): T[K];
    set<K extends keyof T>(prop: K, value: T[K]): void;
    update<K extends keyof T>(update: Partial<T>): void;
    copy(): Dataclass<T>;
    equals(other: Dataclass<T>): boolean;
    toString(): string;
}
export { Dataclass };
