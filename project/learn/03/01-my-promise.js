// 一、Promise 核心逻辑实现
// const promise = new Promise((resolve, reject) => {
//   // 1、修改状态为成功
//   resolve("now status is resolve");

//   // 2、修改状态为失败
//   reject(new Error("now status is reject"));

//   // 3.修改状态只能修改一次
//   resolve("now status is resolve");
//   reject(new Error("now status is reject"));
// });

// promise.then(
//   (success) => {
//     console.log("on success");
//     console.log(success);
//   },
//   (failure) => {
//     console.log("on failure");
//     console.log(failure);
//   }
// );

// 二、Promise 中加入异步逻辑
// const promise = new Promise((resolve, reject) => {
//   // 1、2s 后修改状态为成功
//   setTimeout(() => {
//     resolve("now status is resolve");
//   }, 2000);

//   // 2、2s 后修改状态为失败
//   setTimeout(() => {
//     reject(new Error("now status is reject"));
//   }, 2000);
// });

// promise.then(
//   (success) => {
//     console.log("on success");
//     console.log(success);
//   },
//   (failure) => {
//     console.log("on failure");
//     console.log(failure);
//   }
// );

// 三、同一个 Promise对象 多次调用 then 方法
// const promise = new Promise((resolve, reject) => {
//   // 1、2s 后修改状态为成功
//   setTimeout(() => {
//     resolve("now status is resolve");
//   }, 2000);

//   // 2、2s 后修改状态为失败
//   setTimeout(() => {
//     reject(new Error("now status is reject"));
//   }, 2000);
// });

// promise.then(
//   (success) => {
//     console.log("on success");
//     console.log(success);
//   },
//   (failure) => {
//     console.log("on failure");
//     console.log(failure);
//   }
// );

// promise.then(
//   (success) => {
//     console.log("on success");
//     console.log(success);
//   },
//   (failure) => {
//     console.log("on failure");
//     console.log(failure);
//   }
// );

// 四、then链式调用
// const promise = new Promise((resolve, reject) => {
//   // 1、2s 后修改状态为成功
//   // setTimeout(() => {
//   resolve("now status is resolve");
//   // }, 2000);

//   // 2、2s 后修改状态为失败
//   // setTimeout(() => {
//   // reject(new Error("now status is reject"));
//   // }, 2000);
// });

// function other() {
//   return new Promise((resolve, reject) => {
//     // 1、 返回resolve
//     resolve("other");
//     // 2、返回reject
//     // reject("failure other");
//   });
// }

// promise
//   .then(
//     (success) => {
//       console.log("on success1");
//       console.log(success);
//       // 1、返回的是普通值
//       // return "normal value";

//       // 2、返回的是一个 Promise 对象
//       return other();

//       // 3、不返回
//     },
//     (failure) => {
//       console.log("on failure1");
//       console.log(failure);
//       // 1、返回的是普通值
//       // return "failure normal value";

//       // 2、返回的是一个 Promise 对象
//       return other();

//       // 3、不返回
//     }
//   )
//   .then(
//     (success) => {
//       console.log("on success2");
//       console.log(success);
//     },
//     (failure) => {
//       console.log("on failure2");
//       console.log(failure);
//     }
//   );

// 五、Promise 调用循环
// const promise = new Promise((resolve, reject) => {
//   resolve("now status is resolve");
// });
// const p1 = promise.then(
//   (success) => {
//     console.log("on success1");
//     console.log(success);
//     // 1、返回自身 promise
//     return p1;
//   },
//   (failure) => {
//     console.log("on failure1");
//     console.log(failure);
//     // 1、返回自身 promise
//     return p1;
//   }
// );
// p1.then(
//   (value) => {
//     console.log("value:", value);
//   },
//   (reason) => {
//     console.log("reason:", reason);
//   }
// );

// 五、Promise.all 方法
// const p1 = new Promise((resolve, reject) => {
//   resolve("success");
//   // reject("failure");
// });
// const p2 = new Promise((resolve, reject) => {
//   resolve("success");
//   // reject("failure");
// });
// Promise.all(["a", "b", p1, p2, "c"]).then(
//   (value) => {
//     console.log("success:", value);
//   },
//   (reason) => {
//     console.log("failure:", reason);
//   }
// );

// 六、Promise.resolve 方法
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("success1");
//     // reject("failure");
//   }, 2000);
// });

// Promise.resolve(1).then(
//   (value) => {
//     console.log("success1:", value);
//   },
//   (reason) => {
//     console.log("failure2:", reason);
//   }
// );
// Promise.resolve(p1).then(
//   (value) => {
//     console.log("success1:", value);
//   },
//   (reason) => {
//     console.log("failure2:", reason);
//   }
// );
// 七、finally 方法
function p1() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve("success1");
      // reject("failure p1");
    }, 2000);
  });
}

function p2() {
  return new MyPromise((resolve, reject) => {
    // resolve("success2");
    reject("failure2");
  });
}
p2()
  .finally(() => {
    console.log("finally");
    // 1、返回一个 Promise 的情况
    return p1();
    // 2、什么都不返回的情况
  })
  .then(
    (value) => console.log("sucess", value),
    (reason) => console.log("failure", reason)
  );

// 八、catch 方法
