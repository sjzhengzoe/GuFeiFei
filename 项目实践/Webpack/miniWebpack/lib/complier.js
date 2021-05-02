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

  // 入口
  run() {
    let entryFileInfo = this.build(this.entry);
    let outputFilePath = path.join(this.output.path, this.output.filename);

    // 分析文件获得对象并存储该对象到moduleInfo
    this.save(entryFileInfo);

    // 将moduleInfo生成文件
    this.file(this.entry, this.moduleInfo, outputFilePath);
  }

  // 分析文件 => 获得对象 => 存储对象到moduleInfo
  save({ entryFilePath, dependies, code }) {
    this.moduleInfo[entryFilePath] = { dependies, code };
    for (const key in dependies) {
      // 分析依赖文件 => 获得文件对象
      let dependiesFileInfo = this.build(dependies[key]);
      // 存储文件对象
      this.save(dependiesFileInfo);
    }
  }

  // 分析文件
  build(entryFilePath) {
    const enrtyFileContent = fs.readFileSync(entryFilePath, "utf-8");

    // 获取AST树
    const ast = parser.getAst(enrtyFileContent);

    // 获取依赖文件
    const dependies = parser.getDependies(entryFilePath, ast);

    // 获取代码
    const { code } = parser.getCode(ast);

    // 返回文件对象
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
