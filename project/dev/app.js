const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const {createProxyMiddleware} = require('http-proxy-middleware');
const webpackConfig = require("./webpack-config/webpack.config");
const compiler = webpack(webpackConfig);

const router = require("./dev-server/router");
const { debug, p,port ,domain} = require("./webpack-config/global");
const { log } = require("./webpack-config/shellLog");


const devServerOptions = Object.assign(webpackConfig.devServer, {
  // stats: "errors-only",
  before(app) {
    app.use("/", router);

    //反向代理
    app.use(
      /^\/(email|api|revision|error|push)/,
      createProxyMiddleware({
        target: domain,
        changeOrigin: true,
        logs: true,
      })
    );

    app.use(async (err, req, res, next) => {
      if (res.headersSent) {
        return next(err);
      }
      return res.send(err);
    });
  },
});

const server = new WebpackDevServer(compiler, devServerOptions);
server.listen(port, (req) => {
 log(req,'red')
 return "sujie"
 log(`Starting server on https://localhost:${port}`,'red');
});
