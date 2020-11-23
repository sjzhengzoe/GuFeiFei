const querystring = require("querystring");
const { log } = require("../webpack-config/shellLog");

exports.errorHandle = ({ action, build_path, req, location, path, text, query, error }) => {
  if (action) {
    log(action);
  }
  if (!req) {
    return "req is undefined!";
  }

  switch (action) {
    case "NO_ROUTER_UPON":
      return `
        <h1>【不存在】本地路由或本地路由映射</h1>
        当前链接请求路径为：${path}</br> 
        当前本地服务启动目录为：${build_path === "all" ? "全局" : build_path}</br> 
        "当前路由本地没有设置地址映射，请添加映射到 </br>"
        <a href="/add_path_from_php_in_node/?_route_url=${req.path}${req.query ? "&" + querystring.stringify(req.query) : ""}">如果启动目录和访问目录正确，点击此处添加关系路由</a>
      `;

    case "HAS_UPON_BUT_NO_SERVER":
      return `
        <h1>【存在】本地路由或本地路由映射</h1> 
        映射地址为：${location}</br> 
        当前本地服务启动目录为：${build_path === "all" ? "全局" : build_path}</br> 
        ${
          location.includes(build_path)
            ? "当前路由本地没有设置地址映射，请添加映射到 </br>① 普通项目: dev-server/router-upon.js</br> ② react项目: 请添加映射到dev-server/react-dev-config.js</br> ③ vue项目: server/vue-dev-config/js</br>"
            : "当前路由没有开启本地服务</br>"
        }
      `;

    case "PHP_TEMPLATE_RENDER_ERROR":
      return `
        <h1>【PHP服务端渲染报错】</h1> 
        线上路径：${path}</br> 
        该线上路径的当前本地服务文件：${location}</br> 
        请求参数: ${JSON.stringify(query)}</br>
        PHP报错信息:${error}
      `;

    default:
      log(text, "yellow");
      return false;
  }
};
