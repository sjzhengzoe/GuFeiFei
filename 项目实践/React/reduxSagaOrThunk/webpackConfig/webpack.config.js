const path = require("path");
const webpack = require("webpack");
// Plugins
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const miniCssExtractPlugun = require("mini-css-extract-plugin");
// 是否是生产环境
const ISPRODUCTION = false;

const { handleEntry, handleHtml } = require("./util");

module.exports = {
  mode: ISPRODUCTION ? "production" : "development",

  entry: handleEntry(),

  output: {
    filename: "page/[name]_[hash:4].js",
    path: path.resolve(__dirname, "../dist"),
  },

  devtool: ISPRODUCTION ? "none" : "checp-module-eval-source-map",

  devServer: {
    port: "8081",
    hotOnly: false, // 修改代码后不自动刷新页面
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
            publicPath: "../../global/img",
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
            publicPath: "../../global/font",
            limit: 1024,
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    ...handleHtml(),

    new miniCssExtractPlugun({
      filename: "./page/[name].css",
    }),
    // new webpack.HotModuleReplacementPlugin(),
  ],

  resolve: {
    alias: {
      global: path.resolve(__dirname, "../src/global"),
      MiniReact: path.resolve(__dirname, "../src/global/js/MiniReact.js"),
    },
  },
};
