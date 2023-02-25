/**
 * 给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true
 * 如果数组中每个元素互不相同，返回 false
 */

// 暴力解法
function containsDuplicate1(nums) {
  var len = nums.length;

  for (var i = 0; i < len; i++) {
    for (var j = i + 1; j < len; j++) {
      if (nums[i] === nums[j]) {
        return true;
      }
    }
  }

  return false;
}

// 哈希表存储已遍历的元素
// 由于找到一个元素就返回了，这里我们可以用 set
function containsDuplicate2(nums) {
  var set = new Set();

  for (var i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      return true;
    }
    set.add(nums[i]);
  }

  return false;
}

// 放入 set 判断长度
function containsDuplicate3(nums) {
  var set = new Set(nums);

  return set.size !== nums.length;
}

// 排序，判断相邻元素
function containsDuplicate4(nums) {
  nums.sort((a, b) => a - b);

  for (var i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      return true;
    }
  }

  return false;
}
