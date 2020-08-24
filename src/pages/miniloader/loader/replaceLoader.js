// 官方提供处理loader的方法
const util = require("loader-utils");
module.exports = function (code) {
  let options = util.getOptions(this);
  let result = code.replace("hello", options.str);

  // 立即返回一个结果
  // return result;

  // 立即返回多个结果
  // this.callback(null, result);

  // 异步返回一个或者多个结果
  const callback = this.async();
  setTimeout(() => {
    callback(null, result);
  }, 3000);
};
