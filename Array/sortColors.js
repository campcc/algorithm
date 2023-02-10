/**
 * 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，
 * 使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列，
 * 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色
 */

// 元素较少，可以考虑计数排序
function sortColors1(nums) {
  var n = nums.length,
    zero = 0,
    one = 0,
    two = 0,
    index = 0;

  // 遍历一遍找出 0，1，2 出现的频率
  for (var i = 0; i < n; i++) {
    if (nums[i] === 0) zero++;
    if (nums[i] === 1) one++;
    if (nums[i] === 2) two++;
  }

  for (var i = 0; i < zero; i++) {
    nums[index++] = 0;
  }

  for (var i = 0; i < one; i++) {
    nums[index++] = 1;
  }

  for (var i = 0; i < two; i++) {
    nums[index++] = 2;
  }
}

// 类似三路快排，将数组拆分为 [0...1], [1...1], [1...2]
function sortColors2(nums) {
  var n = nums.length;

  // nums[0...zero] = 0, nums[two...n-1] = 2
  var zero = -1,
    two = n,
    i = 0;

  while (i < two) {
    if (nums[i] === 1) {
      i++;
    } else if (nums[i] === 2) {
      // 交换后 i 变成了新元素，不需要 i++
      swap(nums, i, --two);
    } else {
      swap(nums, i++, ++zero);
    }
  }

  return nums;
}

function swap(nums, i, j) {
  var temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}
