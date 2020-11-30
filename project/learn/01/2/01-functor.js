// Functor 函子
// class Container {
//   constructor(value) {
//     this._value = value;
//   }
//   map(fn) {
//     return new Container(fn(this._value));
//   }
// }

// console.log(
//   new Container(5).map((item) => item + 1).map((item) => item * item)
// );

// 优化
class Container {
  static of(value) {
    return new Container(value);
  }
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return new Container(fn(this._value));
  }
}

// console.log(
//   Container.of(5)
//     .map((item) => item + 1)
//     .map((item) => item * item)
// );

// 演示 null undefined 的问题
console.log(Container.of(null).map((item) => item.toUpperCase()));
