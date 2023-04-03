/**
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合
 */

// 排列，组合基本思路都是回溯
function combine(n, k) {
  if (n <= 0 || k <= 0 || k > n) {
    return [];
  }

  var res = [];

  // 从 1 开始，寻找 [1..n] 中满足条件的 paths
  var dfs = (start, paths) => {
    if (paths.length === k) {
      res.push(paths.slice());
      return;
    }

    for (var i = start; i <= n; i++) {
      paths.push(i);
      dfs(i + 1, paths);
      paths.pop();
    }
  };

  dfs(1, []);

  return res;
}

// 从排列问题看 “剪枝” 优化
// 对于 start 对应的 paths，如果当前已经没有空位可以填充了，我们就没有必要做选择了
// 比如对于 combine(4, 2)，当 start === 4 时，paths 已经没有空位了
function combine(n, k) {
  if (n <= 0 || k <= 0 || k > n) {
    return;
  }

  var res = [];

  const dfs = (start, paths) => {
    if (paths.length === k) {
      res.push(paths.slice());
      return;
    }

    // 还有 k - paths.length 个空位，我们只需要对剩余的 [i..n - (k - paths.length) + 1] 的元素做选择即可
    for (var i = start; i <= n - (k - paths.length) + 1; i++) {
      paths.push(i);
      dfs(i + 1, paths);
      paths.pop();
    }
  };

  dfs(1, []);

  return res;
}

console.log(combine(4, 2));
