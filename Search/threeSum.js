/**
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]]
 * 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0
 * 请你返回所有和为 0 且不重复的三元组
 */

// 排序后使用对撞指针
function threeSum1(nums) {
  nums.sort((a, b) => a - b);

  var len = nums.length,
    res = [];

  if (len < 3) {
    return [];
  }

  for (var i = 0; i < len; i++) {
    var l = i + 1,
      r = len - 1;

    // 如果第一个元素已经大于 0, 说明已经不可能存在解了, 返回结果
    if (nums[i] > 0) return res;

    // 如果当前元素和下一个元素重复, 跳过
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    while (l < r) {
      var sum = nums[i] + nums[l] + nums[r];

      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);

        while (l < r && nums[l] === nums[l + 1]) {
          l++;
        }

        while (l < r && nums[r] === nums[r - 1]) {
          r--;
        }

        l++;
        r--;
      } else if (sum < 0) {
        l++;
      } else {
        r--;
      }
    }
  }

  return res;
}
