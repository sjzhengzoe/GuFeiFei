// webpack 入口文件 基于node执行 无法使用es6的import语法
const webpackConfigFile = require("./webpack.config.js");
const Complier = require("./lib/complier.js");

new Complier(webpackConfigFile).run();
