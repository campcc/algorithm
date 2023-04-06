/**
 * 如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击
 * 后可以攻击与之处在同一行或同一列或同一斜线上的棋子
 * 给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案
 */

// 00 01 02 03
// 10 11 12 13
// 20 21 22 23
// 30 31 32 33

// 递归回溯每一行，关键在于如何快速判断不合法的情况进行剪枝
// 对于每一列，我们可以直接标记为 col[i]
// 对于对角线，假设我们的横纵坐标为 i,j，对于两条对角线，存在以下规律
// 1. / 对角线所有元素的坐标和相等
// 2. \ 对角线所有元素的坐标差相等
// \ 对角线坐标差可能为负数，为了方便用数组索引来表示第 i 条对角线，我们将坐标差加上 n - 1
function solveNQueens(n) {
  var res = [],
    row = [];

  // 对于大小为 n 的棋盘，列的数量为 n
  var col = new Array(n).fill(false);

  // 对于大小为 n 的棋盘，对角线数量为 2 * n -1
  var diaSum = new Array(2 * n - 1).fill(false),
    diaDiff = new Array(2 * n - 1).fill(false);

  // 尝试在第 index 行摆放皇后
  var dfs = function (index) {
    if (index === n) {
      res.push(generateBoard(row));
      return;
    }

    // 尝试将第 index 行的皇后摆放在第 i 列
    for (var i = 0; i < n; i++) {
      // 皇后可以摆放的条件：第 i 列没有皇后，并且当前坐标的对角线上也没有皇后
      if (!col[i] && !diaSum[index + i] && !diaDiff[index - i + n - 1]) {
        row.push(i);

        col[i] = true;
        diaSum[index + i] = true;
        diaDiff[index - i + n - 1] = true;

        dfs(index + 1);

        col[i] = false;
        diaSum[index + i] = false;
        diaDiff[index - i + n - 1] = false;

        row.pop();
      }
    }
  };

  var generateBoard = function (row) {
    var board = new Array(n).fill(".".repeat(n));

    for (var i = 0; i < n; i++) {
      var str = board[i],
        rowIndex = row[i];

      board[i] = str.substring(0, rowIndex) + "Q" + str.substring(rowIndex + 1);
    }

    return board;
  };

  dfs(0);

  return res;
}

console.log(solveNQueens(4));

// 变种1：求 n 皇后问题解的数量
function totalNQueens(n) {
  var res = 0,
    col = new Array(n).fill(false),
    diaSum = new Array(2 * n - 1),
    diaDiff = new Array(2 * n - 1);

  var dfs = (index) => {
    if (index === n) {
      res++;
      return;
    }

    for (var i = 0; i < n; i++) {
      if (!col[i] && !diaSum[index + i] && !diaDiff[index - i + n - 1]) {
        col[i] = true;
        diaSum[index + i] = true;
        diaDiff[index - i + n - 1] = true;
        dfs(index + 1);
        col[i] = false;
        diaSum[index + i] = false;
        diaDiff[index - i + n - 1] = false;
      }
    }
  };

  dfs(0);

  return res;
}

console.log(totalNQueens(4));
