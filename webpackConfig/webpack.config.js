const path = require("path")
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
        test: /\.(jpe?g|png|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash:4].[ext]",
            outputPath: "./global/img",
          },
        },
      },
    ],
  },
}
