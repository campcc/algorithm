/**
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小
 * 每次只能向下或者向右移动一步
 */

// [1, 3, 1],
// [1, 5, 1],
// [4, 2, 1],

// 递归
function minPathSum(grid) {
  if (grid.length === 0) {
    return 0;
  }

  var res = Number.MAX_SAFE_INTEGER,
    m = grid.length,
    n = grid[0].length,
    direction = [
      [0, 1],
      [1, 0],
    ];

  var inArea = function (x, y) {
    return x >= 0 && x < m && y >= 0 && y < n;
  };

  var dfs = function (x, y, sum) {
    if (x === m - 1 && y === n - 1) {
      res = Math.min(res, sum);
      return;
    }

    for (var i = 0; i < 2; i++) {
      var newX = x + direction[i][0];
      var newY = y + direction[i][1];
      if (inArea(newX, newY)) {
        sum += grid[newX][newY];
        dfs(newX, newY, sum);
        sum -= grid[newX][newY];
      }
    }
  };

  dfs(0, 0, grid[0][0]);

  return res;
}

// 递归，记忆化搜索
// 不难发现，上述递归过程中存在大量的 [x, y] 路径和，我们可以考虑用记忆化搜索进行剪枝
// 我们调整下 dfs 定义，返回当前 [x, y] 的最小路径和
function minPathSum(grid) {
  var m = grid.length,
    n = grid[0].length,
    memo = new Array(m),
    direction = [
      [0, 1],
      [1, 0],
    ];

  for (var i = 0; i < m; i++) {
    memo[i] = new Array(n);
  }

  var inArea = function (x, y) {
    return x >= 0 && y >= 0 && x < m && y < n;
  };

  // 寻找 [x, y] 的最小路径和
  var dfs = function (x, y) {
    if (x === m - 1 && y === n - 1) {
      return grid[x][y];
    }

    if (memo[x][y]) {
      return memo[x][y];
    }

    var res = Number.MAX_SAFE_INTEGER;

    for (var i = 0; i < direction.length; i++) {
      var newX = x + direction[i][0];
      var newY = y + direction[i][0];
      if (inArea(newX, newY)) {
        res = Math.min(res, dfs(newX, newY));
      }
    }

    memo[x][y] = res + grid[x][y];

    return memo[x][y];
  };

  return dfs(0, 0);
}

// 动态规划
// 可以自顶向下，也可以自底向上，需要区分几种情况
// 1.对于第一行的最小路径和，方向是固定的从左到右
// 2.对于第一列的最小路径和，方向是固定的从上到下
// 3.对于其他位置，最小路径和为向左或向下路径和中最小的值加上当前元素值
// function minPathSum(grid) {
//   var m = grid.length;

//   if (m === 0) {
//     return 0;
//   }

//   var n = grid[0].length,
//     dp = new Array(m);

//   for (var i = 0; i < m; i++) {
//     dp[i] = new Array(n);
//   }

//   dp[0][0] = grid[0][0];

//   for (var i = 0; i < m; i++) {
//     for (var j = 0; j < n; j++) {
//       // 第一行
//       if (i === 0 && j > 0) {
//         dp[0][j] = dp[0][j - 1] + grid[0][j];
//       }

//       // 第一列
//       if (j === 0 && i > 0) {
//         dp[i][0] = dp[i - 1][0] + grid[i][0];
//       }

//       // 其他情况
//       if (i > 0 && j > 0) {
//         dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
//       }
//     }
//   }

//   return dp[m - 1][n - 1];
// }

console.log(
  minPathSum([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ])
);
