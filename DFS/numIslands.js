/**
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量
 * 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成
 *
 * e.g.
 *
 * 11110
 * 11010
 * 11000
 * 00000 // 1 个岛屿
 *
 * 11000
 * 11000
 * 00100
 * 00011 // 3 个岛屿
 */

// 算法 floodfill 的典型应用
function numIslands(grid) {
  var m = grid.length;

  if (m === 0) {
    return 0;
  }

  var res = 0,
    n = grid[0].length,
    visited = new Array(m),
    direction = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ];

  for (var i = 0; i < m; i++) {
    visited[i] = new Array(n).fill(false);
  }

  var inArea = function (x, y) {
    return x >= 0 && y >= 0 && x < m && y < n;
  };

  var dfs = function (x, y) {
    visited[x][y] = true;

    for (var i = 0; i < 4; i++) {
      var newX = x + direction[i][0];
      var newY = y + direction[i][1];
      if (inArea(newX, newY) && !visited[newX][newY] && grid[newX][newY] === "1") {
        dfs(newX, newY);
      }
    }

    return;
  };

  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      if (grid[i][j] === "1" && !visited[i][j]) {
        res++;
        dfs(i, j);
      }
    }
  }

  return res;
}

console.log(
  numIslands([
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ])
);
