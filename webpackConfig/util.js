const glob = require("glob")
const path = require("path")
// 处理entry路径
// {
//   "reactTest/reactTest": "./src/pages/reactTest/index.jsx",
//   "moreOnePagesTest/moreOnePagesTest": "./src/pages/moreOnePagesTest/index.jsx",
// }
exports.handleEntry = () => {
  let entryObj = {}
  const paths = glob.sync(path.join(__dirname, "../src/pages/*/index.jsx"))
  paths.map(item => {
    let entryFileName = item.match(/pages\/(.*)\/index.jsx$/)[1]
    let outputFilePath = `${entryFileName}/${entryFileName}`
    let entryFilePath = `./src/pages/${entryFileName}/index.jsx`
    entryObj[outputFilePath] = entryFilePath
  })
  return entryObj
}
// html插件配置
// new htmlWebpackPlugin({
//   template: "./src/pages/reactTest/index.html",
//   filename: "./pages/reactTest/reactTest.html",
//   inject: "body",
//   favicon: "./src/global/img/favicon.ico",
//   chunks: "reactTest",1
// })
const htmlWebpackPlugin = require("html-webpack-plugin")
exports.handleHtml = () => {
  let htmlArr = []
  const paths = glob.sync(path.join(__dirname, "../src/pages/*/index.jsx"))
  paths.map(item => {
    let entryFileName = item.match(/pages\/(.*)\/index.jsx$/)[1]
    htmlArr.push(
      new htmlWebpackPlugin({
        template: `./src/pages/${entryFileName}/index.html`,
        filename: `./pages/${entryFileName}/${entryFileName}.html`,
        inject: "body",
        favicon: "./src/global/img/favicon.ico",
        chunks: entryFileName,
      })
    )
  })
  return htmlArr
}
