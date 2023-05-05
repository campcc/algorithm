/**
 * 189. 旋转数组
 * 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
 */

// 使用额外的数组
function rotate(nums) {
  var n = nums.length,
    temp = new Array(n);

  for (var i = 0; i < n; i++) {
    temp[(i + k) % n] = nums[i];
  }

  for (var i = 0; i < n; i++) {
    nums[i] = temp[i];
  }
}

// 旋转 k 次后，尾部的 k 个元素会移动至头部，其余元素会后移 k 个位置，因此我们可以考虑将数组翻转三次，先翻转所有元素，再翻转 [0, k - 1]，再翻转 [k, n - 1]
// k 可能大于 n，需要注意对 k 进行取模处理
function rotate(nums, k) {
  var n = nums.length,
    k = k % n;

  reverse(nums, 0, n - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, n - 1);
}

function reverse(nums, start, end) {
  while (start < end) {
    const temp = nums[start];
    nums[start] = nums[end];
    nums[end] = temp;
    start++;
    end--;
  }
}
