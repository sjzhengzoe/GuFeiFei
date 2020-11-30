class Maybe {
  static of(value) {
    return new Maybe(value);
  }
  constructor(value) {
    this._value = value;
  }
  map(fn) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this._value));
  }

  isNothing() {
    return this._value == null || this._value == undefined;
  }
}

// 正常情况
// console.log(Maybe.of("Hello World").map((x) => x.toUpperCase()));

// null undefined 情况
// console.log(Maybe.of("null").map((x) => x.toUpperCase()));

// null 情况 但是无法判断null的地方 用 either 函子解决
// console.log(
//   Maybe.of("null")
//     .map((x) => null)
//     .map((x) => x.toUpperCase())
// );
