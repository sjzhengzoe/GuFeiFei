const fp = require("lodash/fp");
class IO {
  static of(value) {
    return new IO(function () {
      return value;
    });
  }
  constructor(fn) {
    this._value = fn;
  }
  map(fn) {
    return new IO(fp.flowRight(fn, this._value));
  }
}

let f = IO.of(process).map((p) => p.execPath);
// 控制不纯的操作在可控的范围内
console.log(f._value());
