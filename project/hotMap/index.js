const Koa = require("koa");
const router = require("koa-router")();
const request = require("request").defaults({ jar: true });
const app = new Koa();

app.use(async (ctx) => {
  ctx.type = "html";

  var a = await request(
    {
      method: "GET",
      url: "https://koa.bootcss.com/",
    },
    function (error, res, body) {
      console.log(body);
      return body;
    }
  );
  ctx.body = a;
});

app.listen(3000);
