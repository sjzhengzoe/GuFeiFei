module.exports = class createTextPlugin {
  constructor(options) {
    console.log(options);
  }
  apply(compiler) {
    // 同步
    compiler.hooks.compile.tap("createTextPlugin", (compilation) => {
      console.log("同步hooks执行");
    });
    // 异步
    compiler.hooks.emit.tapAsync("createTextPlugin", (compilation, cb) => {
      console.log("sujie", compilation.assets);
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
