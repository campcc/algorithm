/**
 * 删除排序数组中的重复项
 * 给你一个升序排列的数组 nums ，请你 原地 删除重复出现的元素，使每个元素只出现一次，返回删除后数组的新长度。
 * 元素的相对顺序应该保持 一致 。然后返回 nums 中唯一元素的个数
 */

// 快慢指针，返回慢指针
// 如果元素不等就保留
function removeDuplicates(nums) {
  var n = nums.length,
    slow = 1,
    fast = 1;

  if (n === 0) {
    return 0;
  }

  while (fast < n) {
    if (nums[fast] !== nums[slow - 1]) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }

  return slow;
}
