const path = require("path");
const parser = require("../node_modules/@babel/parser/typings/babel-parser");
const traverse = require("../node_modules/@babel/traverse/lib").default;
const babel = require("../node_modules/@babel/core/lib");
module.exports = {
  // 文件内容 => ast抽象语法树
  getAst: (content) => {
    return parser.parse(content, {
      sourceType: "module",
    });
  },
  // ast => 依赖模块的路径对象
  getDependies: (filePath, ast) => {
    // 通过traverse处理ast抽象语法树 返回入口模块依赖路径
    const dependcies = {};
    traverse(ast, {
      ImportDeclaration({ node }) {
        let absolutePath = "./" + path.join(path.dirname(filePath), node.source.value);
        dependcies[node.source.value] = absolutePath;
      },
    });
    return dependcies;
  },
  // ast => code
  getCode: (ast) => {
    return babel.transformFromAst(ast, null, {
      presets: ["@babel/preset-env"],
    });
  },
};
