# Dataclasses

Dataclasses is a small library written TypeScript.
It provides you with a strongly typed and yet simple approach to
dataclasses.

## Creating a dataclass

```ts
import { Dataclass } from 'dataclasses';

interface IRectangle {
  height: number;
  width: number;
}

class Rectangle extends Dataclass<IRectangle> {}
//                                ^^^^^^^^^^ type parameter that describes the shape of your data

let rectOne = new Rectangle({
  height: 10,
  width: 10,
});
```

## Getting properties

All instances of `Dataclass` will have a `get` method that receives one parameter
specifying the name of the property that should be returned.

```ts
console.log(rectOne.get('width')); // <- will log 10
```

## Setting properties

All instances of `Dataclass` will have a `set` method that receives two parameters
specifying the parameter to update and the value to update with.

```ts
rectOne.set('width', 20);
console.log(rectOne.get('width')); // <- will now log 20
```

## Updating multiple fields

All instances of `Dataclass` will have a `update` method that receives an object
of type `Partial<YourShapeOfData>` an will update all given fields.

```ts
rectOne.update({
  height: 15,
  width: 15,
});
console.log(rectOne.toString());
/*
above will log:
Rectangle {
  "height": 15,
  "width": 15
}
*/
```

## Cloning data

All instances of `Dataclass` will have a `clone` method. This `clone` method will
deep-copy the datastores within the dataclass `clone` was called on and will return
a new instance of that `Dataclass`.

```ts
let rectTwo = rectOne.clone();
```

## Equality checks

All instances of `Dataclass` will have a `equals` method. This `equals` method will
check for deep-strict-equality in the data of the two instances that should be compared.
Does not check for reference equality.

```ts
let rectThree = new Rectangle({
  height: 20,
  width: 15,
});

console.log(rectOne.equals(rectTwo)); // will log true
console.log(rectOne.equals(rectThree)); // will log false
```
