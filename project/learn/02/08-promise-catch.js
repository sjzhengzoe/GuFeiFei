const { reject } = require("lodash");

// 第一种捕获异常的方式
// 只能捕获ajax("/api")的异常
// 如果then返回的Promise出现异常 无法进行捕获
ajax("/api").then(
  function resolve() {
    console.log("resolve");
  },
  function reject() {
    console.log("reject");
  }
);

// 第二种捕获异常的方式
// 可以捕获任意一个的异常
// 因为异常会通过整个链条传递 相当于给整个链条添加异常捕获
ajax("/api")
  .then(() => {
    console.log("resolve");
  })
  .catch(() => {
    console.log("reject");
  });

Promise.resolve("foo").then((val) => {
  // foo
  console.log(val);
});
// 等同于
new Promise((resolve, reject) => {
  resolve("foo");
});

var promise = new Promise((resolve) => {
  resolve("foo");
});
var promise2 = Promise.resolve(promise);
// true
console.log(promise == promise2);

Promise.reject("error").catch((e) => {
  console.log(e);
});

Promise.all(["foo", "foo"]).then(() => {});

function* foo() {
  try {
    const res = yield "foo";
    const res2 = yield "foo2";
  } catch (error) {
    console.log(error);
  }
}

let generator = foo();
generator.next();
generator.next("res2");
// 也会继续执行yeied
generator.throw(new Error("error"));

function* main() {
  const users = yield ajax("/api");
  const users2 = yield ajax("/api");
}

let g = main();
const res = g.next();
res.then((res) => {
  console.log(res);
  const res = g.next();
  res.then((res2) => {
    console.log(res2);
  });
});
