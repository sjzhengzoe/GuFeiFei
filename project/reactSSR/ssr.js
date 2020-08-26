// hack window 在node中没有window 会报错 判断是node则给个window值
if (typeof window == "undefined") {
  global.window = {};
}
const fs = require("fs");
const path = require("path");
const express = require("express");
const { renderToString } = require("react-dom/server");
const App = require("./dist/main");
// 注意文档的格式 utf-8
const tmpl = fs.readFileSync(path.join(__dirname, "./dist/index.html"), "utf-8");
const data = require("./data.json");

const Server = function (port) {
  const app = express();
  // 设置静态资源目录
  app.use(express.static(__dirname + "/dist"));

  // 设置路由
  app.get("/ssr", (req, res) => {
    const html = getHtml(renderToString(App));
    // 返回一个完整的 可以直接解析的html
    res.status(200).send(html);
  });

  // 监听
  app.listen(port, () => {
    console.log("success");
  });
};

const getHtml = function (str) {
  // 替换组件 替换数据
  return tmpl.replace("<!--HTML_PLACE_HOLDER-->", str).replace("<!--DATA_PLACE_HOLDER-->", `<script>window.data=${JSON.stringify(data)}</script/>`);
};

Server(3000);
