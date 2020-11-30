const _ = require("lodash");
function getSum(a, b, c) {
  return a + b + c;
}

function curry(fn) {
  return function f(...args) {
    if (args.length < fn.length) {
      return (...params) => f(...args, ...params);
    }
    return fn(...args);
  };
}

const curried = curry(getSum);

console.log(curried(1, 2, 3));
console.log(curried(1)(2, 3));
console.log(curried(1, 2)(3));
