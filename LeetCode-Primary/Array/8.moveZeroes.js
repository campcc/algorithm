/**
 * 283. 移动零
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 */

function moveZeroes(nums) {
  var k = 0;

  for (var i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      swap(nums, k, i);
      k++;
    }
  }
}

function swap(nums, i, j) {
  var temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}
