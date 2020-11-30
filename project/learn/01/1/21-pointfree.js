// world wild web -> W. W. W
const fp = require("lodash/fp");

// const firstLetterToUpper = fp.flowRight(
//   fp.join(". "),
//   fp.map(fp.first),
//   fp.map(fp.toUpper),
//   fp.split(" ")
// );

// 优化一下
const firstLetterToUpper = fp.flowRight(
  fp.join(". "),
  fp.map(fp.flowRight(fp.first, fp.toUpper)),
  fp.split(" ")
);

console.log(firstLetterToUpper("world wild web"));
