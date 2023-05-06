/**
 * 217. 存在重复元素
 * 给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false 。
 */

// 利用 set
function containsDuplicate(nums) {
  var set = new Set(nums);

  return set.size !== nums.length;
}

// 先排序在比较相邻元素
function containsDuplicate(nums) {
  nums.sort((a, b) => a - b);

  for (var i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      return true;
    }
  }

  return false;
}
