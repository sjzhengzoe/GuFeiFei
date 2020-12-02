const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECT = "reject";

class MyPromise {
  constructor(fn) {
    try {
      fn(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  // 存储该 Promise 状态
  status = PENDING;

  // 成功的数据
  value = undefined;
  // 成功的回调存储
  resolveCallback = [];

  // 失败的数据
  reason = undefined;
  // 失败的回调存储
  rejectCallback = [];

  // 修改状态为resolve函数
  resolve = (value) => {
    if (this.status == PENDING) {
      this.status = FULFILLED;
      this.value = value;
      while (this.resolveCallback.length) {
        this.resolveCallback.shift()();
      }
    }
  };

  // 修改状态为reject函数
  reject = (reason) => {
    if (this.status == PENDING) {
      this.status = REJECT;
      this.reason = reason;
      while (this.rejectCallback.length) {
        this.rejectCallback.shift()();
      }
    }
  };
  then(
    resolveCallback = (value) => value,
    rejectCallback = (reason) => {
      // 因为要传递一个 reject 所以为了能够走到reject 必须抛出一个错误让catch捕获
      throw reason;
    }
  ) {
    let returnPromise = new MyPromise((resolve, reject) => {
      if (this.status == FULFILLED) {
        setTimeout(() => {
          try {
            let value = resolveCallback(this.value);
            // value 有两种可能
            // 正常值 => 直接返回正常值
            // Promise 对象 => 等待结果再处理
            this.returnValueDeal(value, returnPromise, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else if (this.status == REJECT) {
        setTimeout(() => {
          try {
            let reason = rejectCallback(this.reason);
            this.returnValueDeal(reason, returnPromise, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else {
        this.resolveCallback.push(() => {
          setTimeout(() => {
            try {
              let value = resolveCallback(this.value);
              this.returnValueDeal(value, returnPromise, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.rejectCallback.push(() => {
          setTimeout(() => {
            try {
              let reason = rejectCallback(this.reason);
              this.returnValueDeal(reason, returnPromise, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });
    return returnPromise;
  }

  returnValueDeal(returnValue, returnPromise, resolve, reject) {
    if (returnPromise == returnValue) {
      reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
    } else if (returnValue instanceof MyPromise) {
      returnValue.then(resolve, reject);
    } else {
      resolve(returnValue);
    }
  }

  static all(arr) {
    return new MyPromise((resolve, reject) => {
      let result = [];
      let index = 0;
      function add(key, item) {
        result[key] = item;
        index++;
        if (index == arr.length) {
          resolve(result);
        }
      }
      arr.map((item, key) => {
        if (item instanceof MyPromise) {
          item.then((value) => add(key, value), reject);
        } else {
          add(key, item);
        }
      });
    });
  }
  static resolve(val) {
    if (val instanceof MyPromise) {
      return val;
    } else {
      return new MyPromise((resolve, reject) => {
        resolve(val);
      });
    }
  }
  finally(fn) {
    // finally 就是在模拟一个 then方法
    // 需要多考虑一个情况就是 fn 是一个Promise 我们需要等待完成后 再将 Promise 的数据传给下一个then
    return this.then(
      (value) => {
        return MyPromise.resolve(fn()).then(() => value);
      },
      (reason) => {
        return MyPromise.resolve(fn()).then(() => {
          throw reason;
        });
      }
    );
  }
  catch(fn) {
    return this.then(undefined, fn);
  }
}

// 测试代码
new MyPromise((resolve, reject) => {
  resolve("success2");
  // reject("failure2");
})
  .then((value) => console.log(value))
  .catch((reason) => console.log("reason:", reason));
