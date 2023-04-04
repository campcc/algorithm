/**
 * 有一个 m × n 的矩形岛屿，与 太平洋 和 大西洋 相邻。 “太平洋” 处于大陆的左边界和上边界，而 “大西洋” 处于大陆的右边界和下边界
 * 给定一个 m x n 的整数矩阵 heights ， heights[r][c] 表示坐标 (r, c) 上单元格 高于海平面的高度
 * 如果相邻单元格的高度 小于或等于 当前单元格的高度，雨水可以直接向北、南、东、西流向相邻单元格
 * 返回网格坐标 result 的 2D 列表 ，其中 result[i] = [ri, ci] 表示雨水从单元格 (ri, ci) 流动 既可流向太平洋也可流向大西洋
 *
 * e.g.
 *
 * [
 *  [1, 2, 2, 3, 5],
 *  [3, 2, 3, 4, 4],
 *  [2, 4, 5, 3, 1],
 *  [6, 7, 1, 4, 5],
 *  [5, 1, 1, 2, 4]
 * ]
 *
 * 满足条件的单元格有：第一排的 5, 第二排的 4, 4， 第三排的 5, 第四排的 6, 7, 第五排的 5
 *
 * [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
 */

function pacificAtlantic(heights) {
  var m = heights.length;

  if (m === 0) {
    return [];
  }

  var res = [],
    n = heights[0].length,
    pacific = new Array(m),
    atlantic = new Array(m),
    direction = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ];

  for (var i = 0; i < m; i++) {
    pacific[i] = new Array(n).fill(false);
    atlantic[i] = new Array(n).fill(false);
  }

  var inArea = function (x, y) {
    return x >= 0 && x < m && y >= 0 && y < n;
  };

  // 标记满足条件的路径坐标
  var dfs = function (x, y, visited) {
    visited[x][y] = true;

    for (var i = 0; i < 4; i++) {
      var newX = x + direction[i][0];
      var newY = y + direction[i][1];
      if (!inArea(newX, newY) || heights[x][y] > heights[newX][newY] || visited[newX][newY]) {
        continue;
      }
      dfs(newX, newY, visited);
    }
  };

  // 从左上（太平洋）边界开始，搜索是否存在到右下（大西洋）的路径
  for (var i = 0; i < m; i++) {
    dfs(i, 0, pacific);
    dfs(i, n - 1, atlantic);
  }

  // 从右下（大西洋）边界开始，搜索是否存在到左上（太平洋）的路径
  for (var j = 0; j < n; j++) {
    dfs(0, j, pacific);
    dfs(m - 1, j, atlantic);
  }

  // 两个标记数组交叠的坐标，即是满足条件的坐标
  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      if (pacific[i][j] && atlantic[i][j]) {
        res.push([i, j]);
      }
    }
  }

  return res;
}

console.log(
  pacificAtlantic([
    [1, 2, 2, 3, 5],
    [3, 2, 3, 4, 4],
    [2, 4, 5, 3, 1],
    [6, 7, 1, 4, 5],
    [5, 1, 1, 2, 4],
  ])
);
