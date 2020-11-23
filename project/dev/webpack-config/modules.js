const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { debug } = require("./global");
const modules = {
  rules: [
    {
      test: /\.(scss|css)$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: debug ? "/" : "/pc/",
            // hmr: debug,
          },
        },
        {
          loader: "css-loader",
          // options: {
          //   minimize: true,
          // },
        },
        {
          loader: "postcss-loader",
        },
        {
          loader: "sass-loader",
        },
        // {
        //   loader: "sass-resources-loader",
        //   options: {
        //     resources: [path.resolve(__dirname, "../src/global/scss/function/_color.scss"), path.resolve(__dirname, "../src/global/scss/function/_mixin_function.scss")],
        //   },
        // },
      ],
    },
    {
      test: /\.hbs$/,
      use: [
        {
          loader: "handlebars-loader",
          options: {
            inlineRequires: /^(?!http:|https:|\/\/).*\.(jpe?g|png|gif|svg)$/,
            // helperDirs: path.join(__dirname, "../src/global/js/hbs-helpers"),
            // precompileOptions: {
            //   knownHelpersOnly: false,
            // },
            // partialDirs: [path.join(__dirname, "../src/components"), path.join(__dirname, "../src/global/tmpl")],
          },
        },
      ],
    },
    {
      test: /\.(png|jpe?g|gif)$/,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: debug ? 1 : 10 * 1000, //低于10K，
            name: debug ? "global/img/[name].[ext]" : "global/img/[name].[hash:8].[ext]",
          },
        },
        // {
        //   loader: "image-webpack-loader",
        //   options: {
        //     mozjpeg: {
        //       progressive: true,
        //       quality: 80,
        //     },
        //     pngquant: {
        //       quality: 80,
        //       speed: 4,
        //     },
        //     disable: !o_tinyimg, // 仅在生产&&命令行指定压图
        //   },
        // },
      ],
    },
    // {
    //   test: /\.(js|jsx)$/,
    //   exclude: /node_modules/,
    //   use: [
    //     {
    //       loader: "babel-loader",
    //       options: {
    //         cacheDirectory: true,
    //       },
    //     },
    //     {
    //       loader: path.resolve(__dirname, "loaders/import-style-loader.js"),
    //     },
    //   ],
    // },
    // {
    //   enforce: "pre",
    //   test: /\.(js|jsx)$/,
    //   exclude: /node_modules/,
    //   use: {
    //     loader: "eslint-loader",
    //     options: {
    //       fix: true, //eslint-loader bug
    //       emitWarning: debug ? true : false,
    //       formatter: require("eslint-friendly-formatter"), //编译后错误报告格式，可以让eslint的错误信息出现在终端上
    //     },
    //   },
    // },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 1024,
            name: "css/fonts/[name]" + (debug ? "" : ".[hash:8]") + ".[ext]",
            publicPath: debug ? "/" : "/pc/",
          },
        },
      ],
    },
  ],
};
exports.modules = modules;
