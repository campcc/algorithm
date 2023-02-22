/**
 * 给定一个整数数组 nums 和一个整数目标值 target,
 * 请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标
 * 只会存在一个有效答案
 * nums = [2,7,11,15], target = 9 // [0, 1]
 * nums = [3,2,4], target = 6 // [1, 2]
 */

// 暴力解法
function twoSum1(nums, target) {
  var len = nums.length;

  for (var i = 0; i < len; i++) {
    for (var j = i + 1; j < len; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}

// 排序后使用指针对撞
function twoSum2(nums, target) {
  var ordered = nums.map((val, index) => ({ val, index })).sort((a, b) => a.val - b.val),
    l = 0,
    r = ordered.length - 1;

  while (l < r) {
    var sum = ordered[l].val + ordered[r].val;
    if (sum === target) {
      return [ordered[l].index, ordered[r].index];
    } else if (sum < target) {
      l++;
    } else {
      r--;
    }
  }
}

// 哈希表
function twoSum3(nums, target) {
  var map = new Map();

  for (var i = 0; i < nums.length; i++) {
    if (map.get(target - nums[i]) !== undefined) {
      return [map.get(target - nums[i]), i];
    }
    map.set(nums[i], i);
  }
}
