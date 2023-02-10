/**
 * 给你一个下标从 1 开始的整数数组 numbers，该数组已按 非递减顺序排列，
 * 请你从数组中找出满足相加之和等于目标数 target 的两个数
 * 如果设这两个数分别是 numbers[index1] 和 numbers[index2] ，则 1 <= index1 < index2 <= numbers.length
 * 你可以假设每个输入只对应唯一的答案 ，而且你不可以重复使用相同的元素
 * 你所设计的解决方案必须只使用常量级的额外空间
 */

// 暴力循环 O(n^2)
function twoSum1(nums, target) {
  var n = nums.length;

  for (var i = 0; i < n; i++) {
    for (var j = i + 1; j < n; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}

// 考虑到数组有序，可以使用二分查找，复杂度为 O(nlog(n))
// 对于遍历的 nums[i]，可以在剩余的数组中查找是否存在 target - nums[i]
function twoSum2(nums, target) {
  for (var i = 0; i < nums.length; i++) {
    var pos = binarySearch(nums, i + 1, target - nums[i]);
    if (pos !== -1) {
      return [i, pos];
    }
  }
}

// 利用对撞指针，可以进一步把复杂度降为 O(n)
// 由于数组有序，我们可以通过判断 nums[l] + nums[r] 与 target 的大小关系来决定移动首指针还是尾指针，只需要一次遍历
function twoSum3(nums, target) {
  var l = 0,
    r = nums.length - 1;

  while (l < r) {
    if (nums[l] + nums[r] === target) {
      return [l, r];
    } else if (nums[l] + nums[r] < target) {
      l++;
    } else {
      r--;
    }
  }
}

// 变种1：如果是无序数组，可以利用空间换时间的思想，借助哈希表实现
function twoSum4(nums, target) {
  var map = {};

  for (var i = 0; i < nums.length; i++) {
    if (map[target - nums[i]] !== undefined) {
      return [map[target - nums[i]], i];
    }
    map[nums[i]] = i;
  }
}

function binarySearch(nums, l, target) {
  var r = nums.length - 1;

  while (l <= r) {
    var mid = l + Math.floor((r - l) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  return -1;
}
