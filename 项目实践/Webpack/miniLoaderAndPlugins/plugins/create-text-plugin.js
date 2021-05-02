// 该插件的作用是 生成一个text.txt文件
module.exports = class createTextPlugin {
  constructor(options) {
    // 输出配置
    console.log(options);
  }
  apply(compiler) {
    // 同步
    compiler.hooks.compile.tap("createTextPlugin", (compilation) => {
      // 执行某些内容
      console.log("同步hooks执行");
    });

    // 异步
    compiler.hooks.emit.tapAsync("createTextPlugin", (compilation, cb) => {
      // 生成一个text.txt文件
      compilation.assets["text.txt"] = {
        source: function () {
          return "hello text";
        },
        size: function () {
          return 30;
        },
      };
      cb();
    });
  }
};
