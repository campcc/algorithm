/**
 * 给定一个正整数 n ，将其拆分为 k 个 正整数 的和（ k >= 2 ），并使这些整数的乘积最大化
 * 2 <= n <= 58
 */

// 递归 & 记忆化搜索
function integerBreak(n) {
  var memo = [];

  // 将 n 进行分割（至少分割两部分），可以获得的最大乘级
  var dfs = (n) => {
    if (n === 1) {
      return 1;
    }

    if (memo[n]) {
      return memo[n];
    }

    var res = Number.MIN_SAFE_INTEGER;
    for (var i = 1; i <= n - 1; i++) {
      // 乘积最大值还需要考虑只分割两部分的情况
      res = Math.max(res, i * (n - i), i * dfs(n - i));
    }

    memo[n] = res;

    return res;
  };

  return dfs(n);
}

// 动态规划
function integerBreak(n) {
  var dp = new Array(n + 1).fill(Number.MIN_SAFE_INTEGER);

  dp[1] = 1;

  for (var i = 2; i <= n; i++) {
    // 对于数字 i，考虑可以分割的情况
    for (var j = 1; j <= i - 1; j++) {
      dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j]);
    }
  }

  return dp[n];
}

console.log(integerBreak(10));
