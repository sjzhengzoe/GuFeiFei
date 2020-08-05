const path = require('path') ;
module.exports = {
  // 打包模式
  mode:'development',
  // 相对路径相对GuFeiFei
  // webpack是基于node 此处其实是相对于process.cwd(),process.cwd()返回的是Node.js进程的当前工作目录，此处是GuFeiFei。
  entry:'./src/index.js',
  output:{
    // 不设置path则打包文件放在GuFeiFei/dist内
    // 设置path则打包文件放在设置的文件夹内
    filename:'./[name].js',
    path:path.resolve(__dirname,'../dist')
  }
}
