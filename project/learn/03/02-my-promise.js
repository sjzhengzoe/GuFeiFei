const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECT = "reject";
class MyPromise {
  constructor(executor) {
    executor(this.resolve, this.reject);
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
      this.resolveCallback.shift()(this.value);
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
      this.rejectCallback.shift()(this.reason);
    }
  };
  then = (resolveFn, rejectFn) => {
    return new MyPromise((resolve, reject) => {
      if (this.status == FULFILLED) {
        var x = resolveFn(this.value);
        resolve(x);
      } else if (this.status == REJECT) {
        var x = rejectFn(this.reason);
        reject(x);
      } else {
        this.resolveCallback.push(resolve);
        this.rejectCallback.push(reject);
      }
    });
  };
}

function xPromise() {}

var promise = new MyPromise((resolve, reject) => {
  //   setTimeout(() => {
  resolve("1");
  // reject("error");
  //   }, 2000);
})
  .then(
    (value) => {
      console.log(value);
      return 100;
    },
    (reason) => console.log(reason)
  )
  .then(
    (value) => console.log(value),
    (reason) => console.log(reason)
  );
