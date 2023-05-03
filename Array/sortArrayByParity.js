/**
 * 905，按奇偶排序数组
 */

function sortArrayByParity(nums) {
  var n = nums.length;

  if (n <= 1) {
    return nums;
  }

  var left = 0,
    right = n - 1,
    res = [];

  for (var i = 0; i < n; i++) {
    if (nums[i] % 2 === 0) {
      res[left] = nums[i];
      left++;
    } else {
      res[right] = nums[i];
      right--;
    }
  }

  return res;
}
