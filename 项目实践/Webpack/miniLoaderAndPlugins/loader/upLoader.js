// 该loader的作用是将源文件中的HI替换成bye
module.exports = function (code) {
  let result = code.replace("HI", "Bye");
  return result;
};
