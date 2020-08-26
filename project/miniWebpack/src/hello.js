import log from "./console.js";

export function say(name) {
  log(`控制台输出name为：${name}`);
  return "Hello " + name;
}
