module.exports = {
  mode: "development",
  //相对于process.cwd(),process.cwd()返回的是Node.js进程的当前工作目录，此处是workplace。
  entry: "./src/index.js",
  output: {
    filename: "js/[name].[hash:8].js",
  },
}
