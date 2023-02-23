/**
 * 给你一个长度为 n 的整数数组 nums 和 一个目标值 target
 * 请你从 nums 中选出三个整数，使它们的和与 target 最接近
 * 返回这三个数的和, 假定每组输入只存在恰好一个解
 * -10^4 <= target <= 10^4
 * nums = [-1,2,1,-4], target = 1 // 2
 * nums = [0,0,0], target = 1 // 0
 */

function threeSumClosest(nums, target) {
  nums.sort((a, b) => a - b);

  var len = nums.length,
    closest = Number.MAX_SAFE_INTEGER;

  if (len === 3) {
    return nums[0] + nums[1] + nums[2];
  }

  for (var i = 0; i < len; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    var l = i + 1,
      r = len - 1;

    while (l < r) {
      var sum = nums[i] + nums[l] + nums[r];

      if (Math.abs(sum - target) < Math.abs(closest - target)) {
        closest = sum;
      }

      if (sum === target) {
        return target;
      } else if (sum < target) {
        while (l < r && nums[l] === nums[l + 1]) {
          l++;
        }

        l++;
      } else {
        while (l < r && nums[r] === nums[r - 1]) {
          r--;
        }

        r--;
      }
    }
  }

  return closest;
}
