/**
 * 给你一个整数 n ，返回 和为 n 的完全平方数的最少数量
 */

// 动态规划
function numSquares(n) {
  if (n < 0) {
    return 0;
  }

  var dp = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);

  dp[0] = 0;

  for (var i = 1; i <= n; i++) {
    // 寻找小于 i 的完全平方数
    for (var j = 1; j * j <= i; j++) {
      // 对于 i - j * j，只要再加一个平方数 j * j 就可以凑出 i
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }

  return dp[n];
}

console.log(numSquares(12));
