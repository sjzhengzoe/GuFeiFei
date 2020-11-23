const request = require("request-promise").defaults({ jar: true, rejectUnauthorized: false });
const express = require("express");
const router = express.Router();
const { debug, p, port, domain, isHttps } = require("../webpack-config/global");
const { server_render } = require("./server-render");
const { fetchLocalReact } = require("./react-dev-config");
const host = (isHttps ? "https://" : "http://") + "localhost:" + port;
const { errorHandle } = require("./errorHandle");
const { emitter, localRouterPath } = require("./getPhpStaticPath");
const { getFileEntrance } = require("../webpack-config/filePath");
const entry = getFileEntrance({ build_path: p });
const { log } = require("../webpack-config/shellLog");

let build_path = p;

// 初始化
// for (let i in entry) {
//   // pages/main/index  ->  main/index
//   let router_path = entry[i].replace(/(.*)pages\//, "").replace(/\/js(.*)/, ""); //获取到本地开发地址

//   router.get(`/_dev_/${router_path}`, async (req, res, next) => {
//     let html = await request({
//       method: "GET",
//       url: `${host}/${i}.tpl.htm`,
//     })
//       .then((res) => {
//         return res;
//       })
//       .catch((e) => {
//         log(e);
//         errorHandle({
//           action: "NO_ROUTER_UPON",
//           path: `/_dev_/${router_path}`,
//           build_path,
//         });
//       });
//     return res.send(html);
//   });
// }

// 本地没有对应的映射关系的情况 处理
router.get("/add_path_from_php_in_node", async (req, res, next) => {
  emitter.emit("createLocationPath", { res, req });
});

// 所有请求的链接
router.all("*", async (req, res, next) => {
  let { url, path, query, method } = req; // 页面链接上的url

  // 非页面路由
  if (!(/\/[^\/\.]+(\.php)?\/?$/.test(path) || path === "/")) {
    return next();
  }

  let isFindInLocal = null;

  // 遍历本地保存的映射关系
  for (let v of localRouterPath()) {
    if (path === v.key && v.value && localRouterPath().length) {
      // 获取本地文件
      let html = await request({
        method: "GET",
        url: `${host}/${v.value}`,
      })
        .then((res) => {
          return res;
        })
        .catch((e) => {
          log(`sujie ${e}`);
          return next(
            errorHandle({
              action: "NO_ROUTER_UPON",
              path,
              build_path,
            })
          );
        });

      isFindInLocal = v.value;
      log(`${host}/${v.value}  ${html}`);
      //本地文件+服务端渲染
      if (!html) return null;
      html = await server_render({ html, path, query, req }).catch((e) => {
        return next(
          errorHandle({
            action: "PHP_TEMPLATE_RENDER_ERROR",
            location: isFindInLocal,
            path,
            query,
            error: e,
          })
        );
      });
      return res.send(html);
    }
  }

  // 遍历本地保存的映射关系 但没有找到的情况
  if (!isFindInLocal) {
    let html = null;

    // 不匹配以下路由规则
    let isPhpCode = url.match(/.*%7B.*%7D/); //php {}
    let isApi = url.match(/^\/(email|api|revision|error|push)\//);

    // 判断是否react路由
    // html = !isPhpCode && (await fetchLocalReact({ path, url, build_path }));
    html = !isPhpCode;
    
    if (html) {
      return res.send(html);
    }

    if (!isApi && !isPhpCode) {
      console.log("请求的url为", url);
      console.log("请求的路径为", path);
      return next(
        errorHandle({
          action: "NO_ROUTER_UPON",
          path,
          build_path,
          req,
        })
      );
    }
  }

  return next();
});

module.exports = router;
