const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const colors = require('colors');

// components 的路径
let ComponentsPath = path.resolve(__dirname, 'src/components');
// components 下文件夹的名字 等组件多了可以做成可配置
let firstFilesNameArr = fs.readdirSync(ComponentsPath);

module.exports = {
  mode: 'development',
  entry: getEntryPaths(firstFilesNameArr),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/index.js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [{ loader: 'ts-loader' }],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              publicPath: '/global/images',
              limit: 1,
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...getHtmlPluginConfig(firstFilesNameArr),
    new MiniCssExtractPlugin({
      filename: './[name]/index.css',
    }),
  ],

  devtool: 'eval-cheap-module-source-map',

  devServer: {
    contentBase: './src',
    compress: false,
    port: 9000,
  },

  target: 'web',
  watchOptions: {
    ignored: /node_modules/,
  },

  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        extractComments: false, //不将注释提取到单独的文件中
      }),
    ],
  },

  stats: 'errors-only',

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss', '.jsx'],
    alias: {
      Components: path.resolve(__dirname, './src/components/'),
      qeeq: path.resolve(__dirname, './src/index.tsx'),
      global: path.resolve(__dirname, './src/global'),
      images: path.resolve(__dirname, './src/global/images'),
    },
  },
};

// 获取 入口路径
function getEntryPaths(firstFilesNameArr) {
  let entry = {};
  firstFilesNameArr.map(firstFilesName => {
    let seconedFilesNameArr = fs.readdirSync(`${ComponentsPath}/${firstFilesName}`);
    seconedFilesNameArr.map(fileName => {
      entry[
        `${firstFilesName}/${fileName}`
      ] = `./src/components/${firstFilesName}/${fileName}/__test.tsx`;
    });
  });
  console.log(colors.green(`入口路径为:\n`));
  console.log(entry);
  return entry;
}

// 获取 html plugin 配置
function getHtmlPluginConfig(firstFilesNameArr) {
  let plugins = [];
  firstFilesNameArr.map(firstFilesName => {
    let seconedFilesNameArr = fs.readdirSync(`${ComponentsPath}/${firstFilesName}`);
    seconedFilesNameArr.map(seconedFileName => {
      plugins.push(
        new HtmlWebpackPlugin({
          title: seconedFileName,
          filename: `./${firstFilesName}/${seconedFileName}/index.html`,
          template: './src/global/template/component.html',
          chunks: [`${firstFilesName}/${seconedFileName}`],
        })
      );
    });
  });
  return plugins;
}
