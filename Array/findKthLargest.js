/**
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素
 * 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素
 * 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题
 */

function findKthLargest(nums, k) {
  nums.sort((a, b) => b - a);
  return nums[k];
}

// 快排
function findKthLargest(nums, k) {}

// 找到下一个基准
function partition(nums, left, right) {
  var pivotIndex = left;
  var pivot = nums[right];

  for (var i = left; i < right; i++) {
    if (nums[i] < pivot) {
      swap(nums, i, pivotIndex);
      pivotIndex++;
    }
  }

  swap(nums, pivotIndex, right);

  return pivotIndex;
}

function swap(nums, i, j) {
  var temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}
