const fs = require("fs");
const path = require("path");
const request = require("request-promise");
const querystring = require("querystring");

const events = require("events");
const emitter = new events.EventEmitter();

const { api_host } = require("../webpack-config/global");
const filePath = path.join(__dirname, "router-upon.json");

// 返回 router-upon.json 文件的内容
function readFile() {
  let file = fs.readFileSync(filePath, "utf8");
  if (!file.length) {
    file = "[]";
  }
  file = JSON.parse(file);
  return file;
}

// 向 router-upon.json 写入路径
function writeFile(data) {
  fs.writeFileSync(filePath, data);
  log("更新router-upon.json文件成功", "green");
}

// 请求后端 获取当前路由对应的本地文件路径
function fetchPhpPath({ path, req }) {
  return request({
    method: "get",
    headers: {
      Cookie: req.headers.cookie,
    },
    url: `${api_host}/api/private/route?${path}`,
    timeout: 20000,
  })
    .then((res) => {
      //接口抽风，会被 catch
      let { code, data } = typeof res === "string" ? JSON.parse(res) : {};
      if (+code === 0) {
        return (data.tpl ? data.tpl : "").replace(/^.*\/(pages\/)/, "$1");
      }
      if (code === 404) {
        return "noFound";
      }
    })
    .catch((e) => {
      log(e);
      return "tryAgain";
    });
}

// 点击添加路由 处理
emitter.on("createLocationPath", async ({ res, req }) => {
  //req.url = /add_path_from_php_in_node/?_route_url=/reservation/checkout/&clid=238789944&id=226729222&bid=5d076712c0f5845a0d331479
  let param = querystring.stringify(req.query);
  if (param) {
    let _path = req.query._route_url;
    let phpPath = await fetchPhpPath({ path: param, req });
    switch (phpPath) {
      case "tryAgain":
        res.send(`<a href="/add_path_from_php_in_node?${param}">获取线上路径不成功，请再试一次</a>`);
        break;
      case "noFound":
        res.send(`<h1>线上路由不存在</h1>`);
        break;
      default:
        //save && refuse
        if (phpPath) {
          let oldFile = readFile();
          let repeat = null;
          // router-upon有该路径 更新
          for (let i of oldFile) {
            if (i.key === _path) {
              i.value = phpPath;
              repeat = 1;
              break;
            }
          }
          // router-upon没有该路径 添加
          if (!repeat) {
            oldFile.push({
              key: _path,
              value: phpPath,
            });
          }
          let newFile = oldFile;
          newFile = JSON.stringify(newFile, null, "\t");
          writeFile(newFile);
          res.send(`<a href="javascript:" onclick="window.location.href=document.referrer;">添加成功，返回之前页面</a>`);
        } else {
          res.send(`<a href="/add_path_from_php_in_node?${param}">线上返回路径为空，获取线上路径不成功，请再试一次</a>`);
        }
        break;
    }
  }
});

exports.emitter = emitter;
exports.localRouterPath = readFile;
