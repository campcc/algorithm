/**
 * 给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j
 * 满足 nums[i] == nums[j] 且 abs(i - j) <= k
 * 如果存在，返回 true ；否则，返回 false
 */

// 暴力解法
function containsNearbyDuplicate1(nums, k) {
  var len = nums.length;

  for (var i = 0; i < len; i++) {
    for (var j = i + 1; j < len; j++) {
      if (nums[i] === nums[j] && j - i <= k) {
        return true;
      }
    }
  }

  return false;
}

// 暴力解法优化，使用哈希表存储遍历过的元素及下标
function containsNearbyDuplicate2(nums, k) {
  var map = new Map();

  for (var i = 0; i < nums.length; i++) {
    if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
      return true;
    } else {
      map.set(nums[i], i);
    }
  }

  return false;
}

// 固定大小的滑动窗口，这里不需要记录重复值，一旦遇到重复值就 return 了，我们可以用 set
function containsNearbyDuplicate3(nums, k) {
  var set = new Set();

  for (var i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      return true;
    }

    set.add(nums[i]);

    if (set.size > k) {
      set.delete(nums[i - k]);
    }
  }

  return false;
}
