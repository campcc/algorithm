/**
 * 给定一个三角形 triangle ，找出自顶向下的最小路径和
 * 每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点
 * 也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1
 *
 * e.g.
 *
 *    2
 *   3 4
 *  6 5 7
 * 4 1 8 3
 *
 * 最短路径和为 11 (2 + 3 + 5 + 1)
 */

// 递归
function minimumTotal(triangle) {
  var dfs = function (i, j) {
    if (i === triangle.length) {
      return 0;
    }

    return triangle[i][j] + Math.min(dfs(i + 1, j), dfs(i + 1, j + 1));
  };

  return dfs(0, 0);
}

// 递归，记忆化搜索
function minimumTotal(triangle) {
  var memo = [];

  for (var i = 0; i < triangle.length; i++) {
    memo[i] = [];
  }

  var dfs = (i, j) => {
    if (i === triangle.length) {
      return 0;
    }

    if (!memo[i][j]) {
      memo[i][j] = triangle[i][j] + Math.min(dfs(i + 1, j), dfs(i + 1, j + 1));
    }

    return memo[i][j];
  };

  return dfs(0, 0);
}

// 动态规划
// 从三角形底部开始往上求和
function minimumTotal(triangle) {
  var n = triangle.length,
    dp = new Array(n);

  for (var i = 0; i < n; i++) {
    dp[i] = new Array(triangle[i].length);
  }

  for (var i = n - 1; i >= 0; i--) {
    for (var j = 0; j < triangle[i].length; j++) {
      if (i === n - 1) {
        dp[i][j] = triangle[i][j];
      } else {
        dp[i][j] = triangle[i][j] + Math.min(dp[i + 1][j], dp[i + 1][j + 1]);
      }
    }
  }

  return dp[0][0];
}

console.log(minimumTotal([[-1], [2, 3], [1, -1, -3]]));
