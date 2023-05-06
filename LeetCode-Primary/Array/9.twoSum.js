/**
 * 1. 两数之和
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
 */

// 哈希表
function twoSum(nums, target) {
  var map = new Map(),
    n = nums.length;

  for (var i = 0; i < n; i++) {
    if (map.get(target - nums[i]) !== undefined) {
      return [map.get(target - nums[i]), i];
    }

    map.set(nums[i], i);
  }
}
