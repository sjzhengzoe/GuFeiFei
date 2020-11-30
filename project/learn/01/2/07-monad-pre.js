const fp = require("lodash/fp");
const fs = require("fs");

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

let cat = fp.flowRight(print, readFile);

// IO函子问题 IO函子嵌套 IO(IO(x)) 获取值的时候需要 ._value()._value()
let r = cat("../../package.json")._value()._value();
console.log(r);
