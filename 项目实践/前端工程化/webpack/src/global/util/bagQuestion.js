// 背包问题 动态规划

function maxVal(wt, val, bagMaxWeight) {
  let dp = [];
  let length = wt.length;

  for (var w = 0; w <= bagMaxWeight; w++) {
    for (var i = 0; i <= length; i++) {
      if (i == 0 || w == 0) {
        if (!Array.isArray(dp[i])) {
          dp[i] = [];
        }
        dp[i][w] = 0;
      } else {
        let addVal = w - wt[i - 1] >= 0 && dp[i - 1][w - wt[i - 1]] + val[i - 1];
        dp[i][w] = Math.max(addVal, dp[i - 1][w]);
      }
    }
  }
}

// ==========================================================================

// 测试用例

let wt = [2, 1, 3];
let val = [4, 2, 3];
let bagMaxWeight = 4;

maxVal(wt, val, bagMaxWeight);
