/**
 * 给你一个升序排列的数组 nums ，请你原地删除重复出现的元素，使每个元素只出现一次 ，返回删除后数组的新长度
 * 元素的相对顺序应该保持一致
 */

// 思路：给定数组是有序的，所以相同元素必然连续，只需要遍历数组检查哪些元素需要被保留即可
function removeDuplicates(nums) {
  var n = nums.length;

  if (n === 0) {
    return 0;
  }

  var slow = 1,
    fast = 1;

  while (fast < n) {
    // 检查上一个应该保留的元素
    if (nums[fast] !== nums[slow - 1]) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }

  return slow;
}

// 变种 1，去重后最多保留两个
function removeDuplicates2(nums) {
  var n = nums.length;

  if (n <= 2) {
    return n;
  }

  var slow = 2,
    fast = 2;

  while (fast < n) {
    if (nums[fast] !== nums[slow - 2]) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }

  return slow;
}
