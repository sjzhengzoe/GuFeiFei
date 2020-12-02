const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECT = "reject";

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  status = PENDING;

  value = undefined;

  reason = undefined;

  resolveCallback = [];

  rejectCallback = [];

  resolve = (value) => {
    if (this.status !== PENDING) {
      return null;
    } else {
      this.status = FULFILLED;
      this.value = value;
    }
    while (this.resolveCallback.length) {
      this.resolveCallback.shift()();
    }
  };
  reject = (reason) => {
    if (this.status !== PENDING) {
      return null;
    } else {
      this.status = REJECT;
      this.reason = reason;
    }
    while (this.rejectCallback.length) {
      this.rejectCallback.shift()();
    }
  };

  then(
    resolveFn = (value) => value,
    rejectFn = (reason) => {
      throw reason;
    }
  ) {
    let promise = new MyPromise((resolve, reject) => {
      if (this.status == FULFILLED) {
        // 利用 setTimeout 将这里面的代码变成异步代码
        setTimeout(() => {
          try {
            let x = resolveFn(this.value);
            xPromise(x, promise, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else if (this.status == REJECT) {
        setTimeout(() => {
          try {
            let x = rejectFn(this.reason);
            xPromise(x, promise, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else {
        this.resolveCallback.push(() => {
          setTimeout(() => {
            try {
              let x = resolveFn(this.value);
              xPromise(x, promise, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.rejectCallback.push(() => {
          setTimeout(() => {
            try {
              let x = rejectFn(this.reason);
              xPromise(x, promise, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });
    return promise;
  }
  static all(arr) {
    let result = [];
    let index = 0;
    return new MyPromise((resolve, reject) => {
      function add(val) {
        result[index] = val;
        index++;
        if (index == arr.length) {
          resolve(result);
        }
      }
      arr.map((item) => {
        if (item instanceof MyPromise) {
          item.then((value) => add(value), reject);
        } else {
          add(item);
        }
      });
    });
  }
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    } else {
      return new MyPromise((resolveFn) => resolveFn(value));
    }
  }
}

function xPromise(x, promise, resolve, reject) {
  // 处理自己返回自己的情况
  if (promise == x) {
    reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
  } else if (x instanceof MyPromise) {
    // x 是一个Promise对象
    x.then(resolve, reject);
  } else {
    // x 是一个普通值
    resolve(x);
  }
}

let p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功");
  }, 2000);
  // reject("失败");
});

let p2 = new MyPromise((resolve, reject) => {
  resolve("成功");
  // reject("失败");
});

// MyPromise.all(["a", "b", p1, p2, "c"]).then(
//   (value) => console.log(value),
//   (reason) => console.log(reason)
// );

// 模拟返回一个 Promise 对象
function other() {
  return new MyPromise((resolve, reject) => {
    resolve("other");
  });
}

MyPromise.resolve(10).then((val) => console.log(val));
MyPromise.resolve(other()).then((val) => console.log(val));

// var promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve("1");
//     reject("error");
//   }, 2000);
//   // throw new Error("coming error");
// });
// promise
//   .then()
//   .then()
//   .then(
//     (value) => console.log(value),
//     (error) => console.log(error)
//   );
// let pa = promise.then(
//   (value) => {
//     throw new Error("coming error");
//   },
//   (reason) => {
//     console.log(reason);
//     return "10000";
//   }
// );
// pa.then(
//   function su(value) {
//     console.log("1", value);
//   },
//   function su2(reason) {
//     console.log("2", reason);
//   }
// );

// then 中循环调用 自己返回自己 是不被允许的
// then 可能返回普通值或者一个 Promise 对象
