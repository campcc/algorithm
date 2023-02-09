/**
 * Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
 * Note that you must do this in-place without making a copy of the array.
 * Example 1: Input: nums = [0, 1, 0, 3, 12], Output: [1, 3, 12, 0, 0]
 * Example 2: Input: nums = [0], Output: [0]
 * Constraints: 1 <= nums.length <= 104, -2^31 <= nums[i] <= 2^31 - 1
 *
 */

function moveZeros1(nums) {
  var nonZeroElements = []; // 用额外的 O(n) 空间存放非零元素

  for (var i = 0; i < nums.length; i++) {
    if (nums[i]) {
      nonZeroElements.push(nums[i]);
    }
  }

  for (var i = 0; i < nonZeroElements.length; i++) {
    nums[i] = nonZeroElements[i];
  }

  for (var i = nonZeroElements.length; i < nums.length; i++) {
    nums[i] = 0;
  }

  return nums;
}

function moveZeros2(nums) {
  var k = 0; // k 指针指向非零元素

  // 第一次循环每遇到非零元素就替换到 k 处
  // [0, 1, 0, 3, 12] → [1, 3, 12, 3, 12]
  for (var i = 0; i < nums.length; i++) {
    if (nums[i]) {
      nums[k] = nums[i];
      k++;
    }
  }

  // 第二次循环将 k 之后的元素置为 0
  for (var i = k; i < nums.length; i++) {
    nums[i] = 0;
  }
}

function moveZeros3(nums) {
  var k = 0;

  // 直接交换非零元素
  for (var i = 0; i < nums.length; i++) {
    if (nums[i]) {
      swap(nums, k, i);
      k++;
    }
  }
}

function moveZeros4(nums) {
  var k = 0;

  for (var i = 0; i < nums.length; i++) {
    if (nums[i]) {
      // 提高特殊场景下的处理效率，比如数组中没有非零元素
      // 跳过非零元素的交换操作，直接移动 k 指针
      if (i !== k) {
        swap(nums, k, i);
        k++;
      } else {
        k++;
      }
    }
  }
}

function swap(nums, i, j) {
  var temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}
