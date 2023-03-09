/**
 * 给你一个整数 n ，返回 和为 n 的完全平方数的最少数量
 */

// 暴力递归
function numSquares(n) {
  if (n === 0) {
    return 0;
  }

  var count = Number.MAX_SAFE_INTEGER;

  for (var i = 1; n - i * i >= 0; i++) {
    count = Math.min(count, numSquares(n - i * i) + 1);
  }

  return count;
}

// 利用哈希表优化递归
function numSquares(n) {
  var map = new Map();

  function dfs(n) {
    if (map.has(n)) {
      return map.get(n);
    }

    if (n === 0) {
      return 0;
    }

    var count = Number.MAX_SAFE_INTEGER;

    for (var i = 1; n - i * i >= 0; i++) {
      count = Math.min(count, dfs(n - i * i) + 1);
    }

    map.set(n, count);

    return count;
  }

  return dfs(n);
}

// 自底向上动态规划
function numSquares(n) {
  var dp = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);

  dp[0] = 0;

  // 依次求 1, 2...n 的解
  for (var i = 1; i <= n; i++) {
    for (var j = 1; i - j * j >= 0; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }

  return dp[n];
}

// 广度优先搜索
function numSquares(n) {
  var queue = [],
    level = 0,
    set = new Set();

  queue.push(n);

  while (queue.length) {
    var size = queue.length;

    level++;

    var i = 0;
    while (i < size) {
      var top = queue.shift();
      for (var j = 1; top - j * j >= 0; j++) {
        var next = top - j * j;

        if (next === 0) {
          return level;
        }

        if (!set.has(next)) {
          queue.push(next);
          set.add(next);
        }
      }
      i++;
    }
  }
}

// 无权图中从 n 到 0 的最短路径
function numSquares(n) {
  var queue = [];

  queue.push([n, 0]);

  var visited = new Array(n + 1).fill(false);
  visited[n] = true;

  while (queue.length) {
    var [num, step] = queue.shift();

    if (num === 0) {
      return step;
    }

    for (var i = 1; num - i * i >= 0; i++) {
      if (!visited[num - i * i]) {
        queue.push([num - i * i, step + 1]);
      }
    }
  }
}

console.log(numSquares(12));
