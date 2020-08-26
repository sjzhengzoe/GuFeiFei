const path = require("path");
const miniCssExtractPlugun = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "./main.js",
    path: path.resolve(__dirname, "./dist"),
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.css$/,
        use: [miniCssExtractPlugun.loader, "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            esModule: false,
            name: "[name].[ext]",
            outputPath: "./",
            publicPath: "./",
            limit: 1,
          },
        },
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      inject: "body",
      chunks: "main",
    }),
    new miniCssExtractPlugun({
      filename: "./[name].css",
    }),
  ],
};
