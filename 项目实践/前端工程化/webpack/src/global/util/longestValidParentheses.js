// 最长有效括号

// ==========================================================================

// 解法一 栈
// 匹配到右括号的时候 匹配的到左括号就计算max 匹配不到左括号就设置为分隔符号

var longestValidParentheses = function (s) {
  let arr = s.split("");
  let max = 0;
  let use = [-1];
  arr.map((item, i) => {
    if (item == "(") {
      use.push(i);
    } else {
      use.pop();
      if (use.length == 0) {
        use.push(i);
      } else {
        max = Math.max(i - use[use.length - 1], max);
      }
    }
  });

  return max;
};

// ==========================================================================

// 解法二 动态规划
// 遇到右括号计算有效字符串的值
// 有效字符串的值=匹配基础值+内部有效子串数量+前面外部子串数量
// 有效字符串的值 = 2 + dp[i - 1]+dp[i - dp[i - 1] - 2]
// 匹配基础值需要有匹配到的左括号才有值 否则为0
// )()()) 即 0 0 2 0 4 0
var longestValidParentheses = function (s) {
  let arr = s.split("");
  let dp = [];

  arr.map((item, i) => {
    if (item == "(") dp.push(0);
    if (item == ")") {
      let inner = i - 1 >= 0 ? dp[i - 1] : 0;
      let out = i - inner - 2 >= 0 ? dp[i - inner - 2] : 0;
      dp.push(i - inner - 1 >= 0 && arr[i - inner - 1] == "(" ? inner + out + 2 : 0);
    }
  });
  return dp.length > 0 ? Math.max(...dp) : 0;
};

// ==========================================================================
// 测试用例
console.log(longestValidParentheses("()"));
