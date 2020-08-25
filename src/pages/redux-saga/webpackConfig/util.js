const glob = require("glob");
const path = require("path");
// 处理entry路径
// {
//   "reactTest/reactTest": "./src/page/reactTest/index.jsx",
//   "moreOnePagesTest/moreOnePagesTest": "./src/page/moreOnePagesTest/index.jsx",
// }
exports.handleEntry = () => {
  let entryObj = {};
  const paths = glob.sync(path.join(__dirname, "../src/page/*/index.jsx"));

  paths.map((item) => {
    let entryFileName = item.match(/page\/(.*)\/index.jsx$/)[1];
    let outputFilePath = `${entryFileName}/${entryFileName}`;
    let entryFilePath = `./src/page/${entryFileName}/index.jsx`;
    entryObj[outputFilePath] = entryFilePath;
  });
  return entryObj;
};
// html插件配置
// new htmlWebpackPlugin({
//   template: "./src/page/reactTest/index.html",
//   filename: "./page/reactTest/reactTest.html",
//   inject: "body",
//   favicon: "./src/global/img/favicon.ico",
//   chunks: "reactTest",1
// })
const htmlWebpackPlugin = require("html-webpack-plugin");
exports.handleHtml = () => {
  let htmlArr = [];
  const paths = glob.sync(path.join(__dirname, "../src/page/*/index.jsx"));

  paths.map((item) => {
    let entryFileName = item.match(/page\/(.*)\/index.jsx$/)[1];
    console.log("sujie", entryFileName);
    htmlArr.push(
      new htmlWebpackPlugin({
        template: `./src/page/${entryFileName}/index.html`,
        filename: `./page/${entryFileName}/${entryFileName}.html`,
        inject: "body",
        favicon: "./src/global/img/favicon.ico",
        chunks: [`${entryFileName}/${entryFileName}`],
      })
    );
  });

  return htmlArr;
};
