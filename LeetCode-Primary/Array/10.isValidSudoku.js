/**
 * 36. 有效的数独
 * 请你判断一个 9 x 9 的数独是否有效。只需要 根据以下规则 ，验证已经填入的数字是否有效即可。
 * 1. 数字 1-9 在每一行只能出现一次。
 * 2. 数字 1-9 在每一列只能出现一次。
 * 3. 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次
 */

// 遍历一次 board，验证数独规则
function isValidSudoku(board) {
  var rows = new Array(9).fill(0).map(() => new Array(9).fill(0));
  var columns = new Array(9).fill(0).map(() => new Array(9).fill(0));
  var subboxes = new Array(3).fill(0).map(() => new Array(3).fill(0).map(() => new Array(9).fill(0)));

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var c = board[i][j];
      if (c !== ".") {
        var index = c - 1;
        rows[i][index]++;
        columns[j][index]++;
        subboxes[Math.floor(i / 3)][Math.floor(j / 3)][index]++;
        if (rows[i][index] > 1 || columns[j][index] > 1 || subboxes[Math.floor(i / 3)][Math.floor(j / 3)][index] > 1) {
          return false;
        }
      }
    }
  }

  return true;
}
