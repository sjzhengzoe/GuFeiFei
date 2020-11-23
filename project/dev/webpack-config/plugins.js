const { debug } = require("./global");
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// html插件
function htmlWebpackPluginArr(entrance) {
  let _arr = [];
  for (let v in entrance) {
    let htmlWebpackOption = {
      filename: `${v}.tpl.htm`,
      template: entrance[v].replace(/\/js\//g, "/tmpl/").replace(/\.js/g, ".hbs"),
      chunks: [v],
      minify: {
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true, //折叠有助于文档树中文本节点的空白区域
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        ignoreCustomFragments: [/<!--[\s\S]*?-->/, /< {[\s\S]*?}/],
      },
    };

    htmlWebpackOption.favicon = path.join(__dirname, "../src/global/img/favicon.ico"); //favicon路径
    _arr.push(new htmlWebpackPlugin(htmlWebpackOption));
  }

  return _arr;
}

// function preloadWebpackPluginArr() {
//   let _arr = [];

//   if (/all|^(?!guide).*/.test(env_p)) return _arr;

//   return [new preloadWebpackPlugin()];
// }

exports.plugins = (entry) => {
  let plugins = [
    ...htmlWebpackPluginArr(entry),
    // ...preloadWebpackPluginArr(),
    new MiniCssExtractPlugin({
      filename: debug ? "css/[name].css" : "css/[name].[chunkhash:8].css",
    }),
    // new DefinePlugin({
    //   __DEV__: debug,
    //   "process.env": {
    //     NODE_ENV: JSON.stringify(env),
    //   },
    // }),

    // new RuntimePublicPathPlugin({
    //   runtimePublicPath: debug ? "" : '"//s."+window.root_domain+"/pc/"',
    // }),
    // new FriendlyErrorsWebpackPlugin(),

    // new ProgressBarPlugin(),

    // new life({}),
  ];

  return plugins;
};
