const fs = require("fs");
const parser = require("./parser");
const path = require("path");
module.exports = class Complier {
  // 获取到webpack.config.js文件
  constructor(webpackConfigFile) {
    const { entry, output } = webpackConfigFile;
    this.entry = entry;
    this.output = output;
    this.moduleInfo = {};
  }

  // 保存处理好的入口对象到moduleInfo
  save({ entryFilePath, dependies, code }) {
    this.moduleInfo[entryFilePath] = { dependies, code };
    for (const key in dependies) {
      let dependiesFileInfo = this.build(dependies[key]);
      this.save(dependiesFileInfo);
    }
  }

  // 开始入口
  run() {
    let entryFileInfo = this.build(this.entry);
    let outputFilePath = path.join(this.output.path, this.output.filename);
    this.save(entryFileInfo);

    // console.log(this.moduleInfo);

    // 将moduleInfo生成文件
    this.file(this.entry, this.moduleInfo, outputFilePath);
  }

  // 分析入口文件
  build(entryFilePath) {
    const enrtyFileContent = fs.readFileSync(entryFilePath, "utf-8");

    const ast = parser.getAst(enrtyFileContent);

    const dependies = parser.getDependies(entryFilePath, ast);

    const { code } = parser.getCode(ast);

    return {
      entryFilePath,
      dependies,
      code,
    };
  }
  // 文件生成
  file(entryFilePath, moduleInfo, outputFilePath) {
    const bundle = `(function (moduleInfo) {

      function require(modulePath){
        var exports = {};

        function importRequire(importPath){
          var realPath = moduleInfo[modulePath].dependies[importPath];
          return require(realPath);
        }

        (function(require,exports,code){
            eval(code);
        })(importRequire,exports,moduleInfo[modulePath].code);
        return exports;
      }
      require('${entryFilePath}')

    })(${JSON.stringify(moduleInfo)})`;

    fs.writeFileSync(outputFilePath, bundle, "utf-8");
  }
};
