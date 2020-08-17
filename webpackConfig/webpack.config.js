const path = require("path")
const webpack = require("webpack")
// Plugins
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const htmlWebpackPlugin = require("html-webpack-plugin")
const miniCssExtractPlugun = require("mini-css-extract-plugin")
const ISPRODUCTION = false

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "./js/[name].js",
    path: path.resolve(__dirname, "../dist"),
  },
  devtool: ISPRODUCTION ? "none" : "checp-module-eval-source-map",
  devServer: {
    port: "8081",
    hotOnly: true, // 修改代码后不自动刷新页面
    contentBase: ISPRODUCTION ? "./dist" : "./src",
    proxy: {
      "/api": {
        target: "http://localhost:8082",
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          miniCssExtractPlugun.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({
                  overrideBrowserslist: ["last 2 versions", ">1%"],
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "./global/img",
            publicPath: "../global/img",
            limit: 1024,
          },
        },
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "./global/font",
            publicPath: "../global/font",
            limit: 1024,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlWebpackPlugin({
      filename: "./html/index.html", // 入口文件
      template: "./src/index.html", // 打包文件
      inject: "body", // js在何处插入
      favicon: "./src/favicon.ico",
    }),
    new miniCssExtractPlugun({
      filename: "./css/index.css",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
