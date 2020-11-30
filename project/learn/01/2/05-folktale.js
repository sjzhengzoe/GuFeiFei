const { compose, curry } = require("folktale/core/lambda");
const { toUpper, first } = require("lodash/fp");

// curry 的使用
// let f = curry(2, (x, y) => x + y);
// console.log(f(1)(2));
// console.log(f(1, 2));

// compose 的使用
let f = compose(toUpper, first);
console.log(f(["one", "two"]));
