// 不符合预期
const _ = require("lodash");
// 因为map返回三个参数 数组子项 index 数组本身
// 但是parseInt的参数的含义与map不同 数据 进制 数组
// parseInt("23",0,arr); -> 23
// parseInt("8",1,arr); -> NaN
// parseInt("10",2,arr); -> 2
console.log(_.map(["23", "8", "10"], parseInt)); // [ 23, NaN, 2 ]

// 符合预期
const fp = require("lodash/fp");
console.log(fp.map(parseInt, ["23", "8", "10"])); // [ 23, 8, 10 ]
