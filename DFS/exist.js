/**
 * 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false
 */

function exist(board, word) {
  var direction = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ],
    m = board.length,
    n = board[0].length,
    visited = new Array(m);

  for (let i = 0; i < visited.length; ++i) {
    visited[i] = new Array(n).fill(false);
  }

  var inArea = function (x, y) {
    return x >= 0 && y >= 0 && x < m && y < n;
  };

  var dfs = (word, index, startX, startY) => {
    if (index === word.length - 1) {
      return board[startX][startY] === word[index];
    }

    if (board[startX][startY] === word[index]) {
      visited[startX][startY] = true;

      for (var i = 0; i < 4; i++) {
        var newX = startX + direction[i][0];
        var newY = startY + direction[i][1];
        if (inArea(newX, newY) && !visited[newX][newY] && dfs(word, index + 1, newX, newY)) {
          return true;
        }
      }

      visited[startX][startY] = false;
    }

    return false;
  };

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (dfs(word, 0, i, j)) {
        return true;
      }
    }
  }

  return false;
}

console.log(
  exist(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCCED"
  )
);
