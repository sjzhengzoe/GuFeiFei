const path = require("path");
const createTextPlugin = require("./plugins/create-text-plugin.js");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  // 处理loader的路径问题
  resolveLoader: {
    modules: ["node_modules", "./loader"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 必须使用绝对路径
        use: [
          "upLoader",
          {
            loader: "replaceLoader",
            options: {
              str: "HI",
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "./[name].js",
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new createTextPlugin({
      name: "my plugins",
    }),
  ],
};
