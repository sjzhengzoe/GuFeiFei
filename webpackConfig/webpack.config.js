const path = require("path")
// Plugins
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "./[name].js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "./global/img",
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
            limit: 1024,
          },
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
}
