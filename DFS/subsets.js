/**
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集
 * 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集
 * nums = [0] // [[], [0]]
 */

// 回溯，考虑从索引 0 开始，选或者不选当前位置
function subsets(nums) {
  var res = [];

  var dfs = (paths, index) => {
    if (index === nums.length) {
      res.push(paths.slice());
      return;
    }

    // 选择当前位置
    paths.push(nums[index]);
    dfs(paths, index + 1);
    paths.pop();
    // 不选当前位置
    dfs(paths, index + 1);
  };

  dfs([], 0);

  return res;
}

// 也可以考虑针对所有的选择进行回溯
// [1, 2, 3]
// [] [1] [2] [3]
// [1, 2] [1, 3] [2, 3]
// [1, 2, 3]
function subsets(nums) {
  var res = [];

  var dfs = (paths, index) => {
    res.push(paths.slice());

    for (var i = index; i < nums.length; i++) {
      paths.push(nums[i]);
      dfs(paths, i + 1);
      paths.pop();
    }
  };

  dfs([], 0);

  return res;
}

// 变种1: 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集
// 可能存在重复元素，可以考虑先排序，做选择时跳过上一个重复元素
function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);

  var res = [];

  var dfs = (paths, index) => {
    res.push(paths.slice());

    for (var i = index; i < nums.length; i++) {
      if (i > index && nums[i] === nums[i - 1]) {
        continue;
      }

      paths.push(nums[i]);
      dfs(paths, i + 1);
      paths.pop();
    }
  };

  dfs([], 0);

  return res;
}

console.log(subsetsWithDup([1, 2, 2]));
