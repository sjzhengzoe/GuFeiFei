const fp = require("lodash/fp");
const fs = require("fs");

// IO monad
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
  join() {
    return this._value();
  }
  //   fn是一个返回IO函子的函数
  flatMap(fn) {
    return this.map(fn).join();
  }
}

let readFile = function (filename) {
  return new IO(function () {
    return fs.readFileSync(filename, "utf-8");
  });
};

let print = function (x) {
  return new IO(function () {
    console.log(x);
    return x;
  });
};
// 当print是一个返回IO函子的函数 就通过flatMap进行map 帮它组合函数并且返回一个函子 而不会进行嵌套
let r = readFile("../../package.json")
  //   .map((x) => x.toUpperCase())
  .map(fp.toUpper)
  .flatMap(print)
  .join();
console.log(r);
