/**
 * 给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' ，找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充
 */

function solve(board) {
  var m = board.length;

  if (m === 0) {
    return board;
  }

  var n = board[0].length,
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

  var dfs = (x, y) => {
    if (board[x][y] === "X" || visited[x][y]) {
      return;
    }

    // 标记边界的 "O"
    visited[x][y] = true;

    // 寻找当前位置四个方向上是否存在连通的可再次标记的 "O"
    for (var i = 0; i < 4; i++) {
      var newX = x + direction[i][0];
      var newY = y + direction[i][1];
      if (newX < 0 || newX >= m || newY < 0 || newY >= n) {
        continue;
      }
      dfs(newX, newY);
    }
  };

  // 将边界上的 "O" 用 visited 数组标记
  // 上下边界
  for (var i = 0; i < m; i++) {
    if (board[i][0] === "O") {
      dfs(i, 0);
    }
    if (board[i][n - 1] === "O") {
      dfs(i, n - 1);
    }
  }

  // 左右边界
  for (var j = 0; j < n; j++) {
    if (board[0][j]) {
      dfs(0, j);
    }
    if (board[m - 1][j]) {
      dfs(m - 1, j);
    }
  }

  // 将未标记的 "O" 赋值为 "X"
  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      if (!visited[i][j] && board[i][j] === "O") {
        board[i][j] = "X";
      }
    }
  }

  return board;
}

console.log(
  solve([
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["X", "O", "X"],
  ])
);
