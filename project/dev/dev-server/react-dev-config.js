/**
 * ! webpack-dev-server 和 BrowserRouter
 * ! 实现webpack-dev-server 下 BrowserRouter 刷新路由报错404的处理
 * * 该文件主要是做react BrowserRouter basename的收录，根据basename在webpack-dev-server下做404报错处理
 */
const IP = "localhost";
const url = require('url');
const path = require('path');
const {env_port, env_https} = require("../webpack-config/global");
const https = env_https ? "https://" : "http://";
const host = https + IP + ":" + env_port;
const {errorHandle} = require('./errorHandle');
const request = require("request-promise").defaults({jar: true});


const relation = [
  {
    product_path: "/example/react-list",
    location_path: "/example/react-list",
    describe: "该react路由描述，业务指明，入口文件指明"
  }, {
    product_path: "/example/react-index",
    location_path: "/example/react-index",
    describe: "首页"
  }
];

function replaceSymbol(str) {
  return str.replace(/^\//, '').replace(/\/$/, '');
}

async function reactLocalRender({localPath, _url} = {}) {
  // console.log(host + '/' + path.join('pages', localPath) + '.tpl.htm');
  return await request({
    method: "GET",
    url: host + '/' + path.join('pages', localPath) + '.tpl.htm'
  }).then(res => {
    return res ? res : false;
  }).catch(e => {
    errorHandle({text: e});
    return false;
  });
}

/**
 * @param path
 * @param url
 * @returns {Promise<boolean|*>}
 */

exports.fetchLocalReact = async ({path, url}) => {
  if (!path) return false;

  let _path = replaceSymbol(path);
  let _url = url;
  let localPath = null;
  for (let obj of relation) {
    let pro_p = replaceSymbol(obj.product_path);
    if (pro_p === _path) {
      localPath = obj.location_path;
      break;
    }
  }
  return localPath ? reactLocalRender({localPath, _url}) : false;
};