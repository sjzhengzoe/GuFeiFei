const Koa = require("koa");
const router = require("koa-router")();
const request = require("request").defaults({ jar: true });
const app = new Koa();
const { getChartData } = require("./app");

router.get("/api/get/heatmap", async (ctx, next) => {
  let { url, path, query, method } = ctx.request;
  // 参数
  const { dateStart, dateEnd, device = "", pathname } = query;
  // 请求ga接口获取参数
  try {
    let responseData = await getChartData({ dateStart: dateStart ? new Date(dateStart) : new Date(), dateEnd: dateEnd ? new Date(dateEnd) : new Date(), device: device, pathname });
    ctx.response.status = 200;
    ctx.response.body = { code: 200, data: responseData, message: "success" };
  } catch (error) {
    const data = error.response.data.error;
    ctx.response.status = data.code;
    ctx.response.body = { code: data.code, message: data.message };
  }
});

app.use(router.routes());
// http://localhost:3000/api/get/heatmap?dateStart=2020-12-01&dateEnd=2020-12-01&device=mobile
app.listen(3000);
