/**
 * Given an integer array nums and an integer val, remove all occurrences of val in nums in-place.
 * The relative order of the elements may be changed.
 * Return k after placing the final result in the first k slots of nums.
 * Do not allocate extra space for another array.
 * You must do this by modifying the input array in-place with O(1) extra memory.
 *
 * Constraints:
 * 0 <= nums.length <= 100
 * 0 <= nums[i] <= 50
 * 0 <= val <= 100
 */

// 正向双指针，left 指向值不为 val 的元素，right 向前遍历
// 遇到相等元素继续遍历，如果不等替换到 left，left++
function removeElement1(nums, val) {
  var left = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] !== val) {
      nums[left] = nums[right];
      left++;
    }
  }

  return left;
}

// 上面的循环也可以用 while 实现
function removeElement2(nums, val) {
  var left = 0,
    right = 0,
    n = nums.length;

  while (right < n) {
    if (nums[right] !== val) {
      nums[left] = nums[right];
      left++;
    }
    right++;
  }

  return left;
}

// 如果要移除的元素刚好在数组开头，上面的正向双指针需要把每一个元素都左移一位
// 比如 nums = [1, 2, 3, 4, 5], val = 1
// 题设元素的顺序可以改变，为了避免这种情况，我们可以选择首尾遍历进行优化
// 针对上面的例子，尾指针会直接将最后一个元素 5 移动到头部取代 1，得到 [5, 2, 3, 4]，同样满足题设
function removeElement3(nums, val) {
  var left = 0,
    right = nums.length;

  while (left < right) {
    if (nums[left] === val) {
      nums[left] = nums[right - 1];
      right--;
    } else {
      left++;
    }
  }
}
