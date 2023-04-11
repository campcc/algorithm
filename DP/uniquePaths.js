/**
 * 一个机器人位于一个 m x n 网格的左上角, 机器人每次只能向下或者向右移动一步。
 * 机器人试图达到网格的右下角, 总共有多少条不同的路径
 * 1 <= m, n <= 100
 */

// 递归
function uniquePaths(m, n) {
  var res = 0,
    direction = [
      [1, 0],
      [0, 1],
    ];

  var inArea = (x, y) => {
    return x >= 0 && y >= 0 && x < m && y < n;
  };

  var dfs = (x, y) => {
    if (x === m - 1 && y === n - 1) {
      res++;
      return;
    }

    for (var i = 0; i < direction.length; i++) {
      var newX = x + direction[i][0];
      var newY = y + direction[i][1];
      if (inArea(newX, newY)) {
        dfs(newX, newY);
      }
    }
  };

  dfs(0, 0);

  return res;
}

// 上述解法在数据量大的时候会超时，存在大量的重复路径，我们可以考虑用记忆化搜索进行剪枝
function uniquePaths(m, n) {
  var memo = new Array(m);

  for (var i = 0; i < m; i++) {
    memo[i] = new Array(n).fill(-1);
  }

  // 定义 dfs(x, y) 为位置 [x, y] 到终点的路径条数
  var dfs = (x, y) => {
    if (x === m - 1 && y === n - 1) {
      return 1;
    }

    if (x >= m || y >= n) {
      return 0;
    }

    if (memo[x][y] !== -1) {
      return memo[x][y];
    }

    memo[x][y] = dfs(x + 1, y) + dfs(x, y + 1);

    return memo[x][y];
  };

  return dfs(0, 0);
}

// 动态规划
// 我们也可以用递推的思路，对于每一个坐标 [x, y] 只有两种选择
// 考虑第 m - 1行和第 n - 1 列的元素，只有一个方向可选，我们可以先填充这两个边界
function uniquePaths(m, n) {
  var dp = new Array(m);

  for (var i = 0; i < m; i++) {
    dp[i] = new Array(n);
    dp[i][0] = 1;
  }

  for (var j = 0; j < n; j++) {
    dp[0][j] = 1;
  }

  for (var i = 1; i < m; i++) {
    for (var j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
}

console.log(uniquePaths(7, 3));
