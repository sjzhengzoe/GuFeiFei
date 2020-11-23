const path = require("path");
const { debug, p, port } = require("./global");
const { modules } = require("./modules");
const { plugins } = require("./plugins");
const { getFileEntrance } = require("./filePath");
const entry = getFileEntrance({ build_path: p });
module.exports = {
  mode: debug ? "development" : "production",

  entry,

  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: debug ? "js/[name].js" : "js/[name].[chunkhash:8].js",
    chunkFilename: debug ? "js/[name].js" : "js/[name]-[chunkhash:8].js",
    publicPath: debug ? "/" : "//s.{root_domain}/pc/",
  },

  watch: debug ? true : false,

  watchOptions: {
    ignored: /node_modules/,
  },
  devServer: {
    // port: 8082,
    // hot: true,
    // liveReload: false,
    disableHostCheck: true,// 不检测host
    // historyApiFallback: true,
    contentBase: debug ? "../src" : "../dist", //服务器资源的根目录
    // stats: devServerStats,
    https: true,
  },
  devtool: debug ? "cheap-module-eval-source-map" : "none",
  resolve: {
    mainFields: ["module", "jsnext:main", "main"],
    extensions: [".js", ".hot.jsx", ".json", ".jsx", ".css", ".scss", ".hbs"],
    alias: {
      // themes: path.resolve(__dirname, "../src/global/scss/function"),
      // core: path.resolve(__dirname, "../src/core"),
      router: path.resolve(__dirname, "../src/router"),
      // verify: path.resolve(__dirname, "../src/components/verify"),
      api: path.resolve(__dirname, "../src/global/js/api"),
      jquery: path.resolve(__dirname, "../src/lib/jquery-3.1.1.min"),
      ["react-components"]: path.resolve(__dirname, "../src/react-components"),
      models: path.resolve(__dirname, "../src/models"),
      // ["react-reducers"]: path.resolve(__dirname, "../src/react-reducers"),
      // event: path.resolve(__dirname, '../src/global/js/utils/event'),
      pages: path.resolve(__dirname, "../src/pages"),
      components: path.resolve(__dirname, "../src/components"),
      global: path.resolve(__dirname, "../src/global"),
      src: path.resolve(__dirname, "../src"),
      jsCookie: path.resolve(__dirname, "../src/global/js/utils/js-cookie.js"),
      // 'qeeq-ui': path.resolve(__dirname, '../qeeq-ui'),
      utils: path.resolve(__dirname, "../src/global/js/utils"),
    },
  },
  module: modules,
  plugins: plugins(entry),
};
