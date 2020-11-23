const request = require("request-promise");
const { api_host } = require("../webpack-config/global");

exports.server_render = async ({ html, path, query, req }) => {
  // 服务器渲染 将本地代码发送给服务器 服务器返回渲染好的代码
  return new Promise(async (resolve, reject) => {
    if (html) {
      let renderDoneHtml = await request({
        method: "post",
        url: api_host + req.url,
        headers: {
          Cookie: req.headers.cookie,
        },
        form: {
          template_html: encodeURIComponent(html),
        },
      })
        .then((res) => {
          return res;
        })
        .catch((e) => {
          reject(e);
        });

      resolve(renderDoneHtml);
    }
  });
};
