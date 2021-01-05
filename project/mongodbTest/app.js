const Koa = require("koa");
const router = require("koa-router")();
const request = require("request").defaults({ jar: true });
const bodyParser = require("koa-bodyparser");
var mongoose = require("mongoose");
const app = new Koa();

// ===== 获取所有todo数据 =====
router.get("/api/getCards", async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", ctx.request.headers.origin);
  ctx.set("Access-Control-Allow-Credentials", true);

  let { url, path, query, method } = ctx.request;
  const { type } = query;
  if (type == "todo") {
    let responseData = [];
    await new Promise((resolve) => {
      Todo.find({}, function (err, docs) {
        responseData = docs;
        resolve(true);
      });
    });
    ctx.response.status = 200;
    ctx.response.body = { code: 200, data: responseData, message: "success" };
  }
});

// ===== 添加一条 todo 数据 =====
router.post("/api/add", async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", ctx.request.headers.origin);
  ctx.set("Access-Control-Allow-Credentials", true);

  let { url, path, query, method } = ctx.request;
  let data = ctx.request.body;

  let todo = new Todo({ title: data.title, userId: data.userId });
  todo.save();

  ctx.response.status = 200;
  ctx.response.body = { code: 200, data: [], message: "success" };
});

// ===== 搜索一条 todo 数据 =====
router.get("/api/search", async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", ctx.request.headers.origin);
  ctx.set("Access-Control-Allow-Credentials", true);

  let { url, path, query, method } = ctx.request;
  let reg = new RegExp(`${query.title}`, "g");
  let todo = await Todo.find({ title: reg }, null, { limit: query.limit });

  ctx.response.status = 200;
  ctx.response.body = { code: 200, data: todo, message: "success" };
});

// ===== 更新一条 todo 数据 =====
router.post("/api/update", async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", ctx.request.headers.origin);
  ctx.set("Access-Control-Allow-Credentials", true);

  let { url, path, query, method } = ctx.request;
  let data = ctx.request.body;
  let { _id, title, concept, completed } = data;

  let todo = await Todo.findOne({ _id });

  title && (todo.title = title);
  concept && (todo.concept = concept);
  completed && (todo.completed = completed);
  todo.save();

  ctx.response.status = 200;
  ctx.response.body = { code: 200, data: [], message: "success" };
});

// ===== 启动 =====
app.use(bodyParser());
app.use(router.routes());
app.listen(3000);

// 连接数据库
mongoose.connect("mongodb://localhost/app", { useUnifiedTopology: true, useNewUrlParser: true }, function (err) {
  if (!err) {
    console.log("connected to MongoDB!");
  } else {
    throw err;
  }
});

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  completed: { type: Boolean, default: false },
  concept: { type: String, default: "" },
  title: { type: String, default: "" },
  userId: { type: String, default: "6f22f2ca-309e-40c7-9d00-9b66dd3703c7" },
});
let Todo = mongoose.model("todo", todoSchema);
