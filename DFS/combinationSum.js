/**
 * 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回
 * candidates 中的 同一个 数字可以 无限制重复被选取
 * 1 <= candidates.length <= 30
 * 2 <= candidates[i] <= 40
 * candidates 的所有元素 互不相同
 * 1 <= target <= 40
 * candidates = [2, 3, 6, 7], target = 7 // [[2, 2, 3], [7]]
 */

function combinationSum(candidates, target) {
  var res = [];

  const dfs = (paths, index, target) => {
    if (target === 0) {
      res.push(paths.slice());
      return;
    }

    for (var i = index; i < candidates.length; i++) {
      if (target - candidates[i] >= 0) {
        paths.push(candidates[i]);
        dfs(paths, i, target - candidates[i]);
        paths.pop();
      }
    }
  };

  dfs([], 0, target);

  return res;
}

// 7
// 5(-2) 4(-3) 1(-6) 0(-7)
// 3(-2) 2(-3) -1(-6) -2(-7) ...

console.log(combinationSum([8, 7, 4, 3], 11));

// 变种1: 集合中的元素可能相同, 每个元素只能用一次
// 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
// candidates 中的每个数字在每个组合中只能使用 一次
// 注意：解集不能包含重复的组合
// candidates = [2, 5, 2, 1, 2], target = 5 // [[2, 1, 2], [5]]

// 思路：
// 1.每个数字只能选一次，我们可以考虑从下一层从 i + 1 开始
// 2.集合中存在重复元素，我们可以考虑先对集合排序，然后做选择时跳过上一个重复元素
function combinationSum2(candidates, target) {
  var res = [];

  candidates.sort((a, b) => a - b);

  const dfs = (paths, index, target) => {
    if (target === 0) {
      res.push(paths.slice());
      return;
    }

    for (var i = index; i < candidates.length; i++) {
      var rest = target - candidates[i];

      if (i > index && candidates[i] === candidates[i - 1]) {
        continue;
      }

      if (rest >= 0) {
        paths.push(candidates[i]);
        dfs(paths, i + 1, rest);
        paths.pop();
      }
    }
  };

  dfs([], 0, target);

  return res;
}

console.log(combinationSum2([2, 5, 2, 1, 2], 5));

// 变种2: 在 1-9 这 9 个数字中，选出 k 个数字，每个数字只能使用一次，使得和为 n
// 2 <= k <= 9
// 1 <= n <= 60
function combinationSum3(k, n) {
  var res = [];

  const dfs = (paths, index, n) => {
    if (n === 0 && paths.length === k) {
      res.push(paths.slice());
      return;
    }

    for (var i = index; i <= 9; i++) {
      var rest = n - i;

      if (rest >= 0) {
        paths.push(i);
        dfs(paths, i + 1, rest);
        paths.pop();
      }
    }
  };

  dfs([], 1, n);

  return res;
}

console.log(combinationSum3(3, 9));
