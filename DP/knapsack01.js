/**
 * 0-1 背包问题，背包容量为 c，从 n 个物品中选取，每个物品的重量为 w(i)，价值为 v(i)，使得价值最大
 * 对于任意的第 i 个物品，考虑放入或不放入背包
 * F(i, c) = Math.max(F(i - 1, c), v(i) + F(i - 1, c - w(i)))
 */

// 递归
function knapsack01(w, v, c) {
  function bestValue(w, v, i, c) {
    if (i < 0 || c <= 0) {
      return 0;
    }

    var res = bestValue(w, v, i - 1, c);

    if (c >= w[i]) {
      res = Math.max(res, v[i] + bestValue(w, v, i - 1, c - w[i]));
    }

    return res;
  }

  // 考虑 [0...n-1]
  var n = w.length;
  return bestValue(w, v, n - 1, c);
}

// 递归 + 记忆化搜索
function knapsack01(w, v, c) {
  var n = w.length,
    memo = new Array(n);

  for (var i = 0; i < n; i++) {
    memo[i] = new Array(c + 1).fill(-1);
  }

  function bestValue(w, v, i, c) {
    if (i < 0 || c <= 0) {
      return 0;
    }

    if (memo[i][c] !== -1) {
      return memo[i][c];
    }

    memo[i][c] = bestValue(w, v, i - 1, c);

    if (c >= w[i]) {
      memo[i][c] = Math.max(memo[i][c], v[i] + bestValue(w, v, i - 1, c - w[i]));
    }

    return memo[i][c];
  }

  return bestValue(w, v, n - 1, c);
}

// 动态规划
function knapsack01(w, v, c) {
  var n = w.length,
    dp = new Array(n);

  if (n === 0) {
    return 0;
  }

  for (var i = 0; i < n; i++) {
    dp[i] = new Array(c + 1).fill(-1);
  }

  dp[0][0] = 0;

  // 只考虑一个物品
  for (var i = 1; i <= c; i++) {
    dp[0][i] = v[0];
  }

  for (var i = 1; i < n; i++) {
    for (var j = 1; j <= c; j++) {
      dp[i][j] = dp[i - 1][j];
      if (j >= w[i]) {
        dp[i][j] = Math.max(dp[i][j], v[i] + dp[i - 1][j - w[i]]);
      }
    }
  }

  return dp[n - 1][c];
}

console.log(knapsack01([1, 2, 3], [6, 10, 12], 5));
