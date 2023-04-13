/**
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案
 */

// 1， 2， 3
//
//

// 回溯
function permute(nums) {
  if (nums.length === 0) {
    return [];
  }

  var res = [],
    used = [];

  var dfs = (paths, index) => {
    if (index === nums.length) {
      res.push(paths.slice());
      return;
    }

    for (var i = 0; i < nums.length; i++) {
      if (used[i]) {
        continue;
      }

      paths.push(nums[i]);
      used[i] = true;
      dfs(paths, index + 1);
      paths.pop();
      used[i] = false;
    }
  };

  dfs([], 0);

  return res;
}

// console.log(permute([1, 2, 3]));

// 变种1: 如果 nums 中可能有相同的元素, 返回这些元素所有排列的可能
// 核心思路, 先对 nums 进行排序, 选择下一个元素时, 判断上一个元素是否值相同并已经用过
function permuteUnique(nums) {
  if (nums.length === 0) {
    return [];
  }

  nums.sort((a, b) => a - b);

  var res = [],
    used = [];

  var dfs = (paths, index) => {
    if (index === nums.length) {
      res.push(paths.slice());
      return;
    }

    for (var i = 0; i < nums.length; i++) {
      if (used[i]) {
        continue;
      }

      // 重复剪枝的条件为: 跟前一个元素值相同, 并且前一个元素没有被使用过
      if (i > 0 && nums[i - 1] === nums[i] && !used[i - 1]) {
        continue;
      }

      paths.push(nums[i]);
      used[i] = true;
      dfs(paths, index + 1);
      paths.pop();
      used[i] = false;
    }
  };

  dfs([], 0);

  return res;
}

// console.log(permuteUnique([3, 3, 0, 3]));
