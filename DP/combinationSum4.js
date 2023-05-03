/**
 * 给你一个由 不同 整数组成的数组 nums ，和一个目标整数 target 。请你从 nums 中找出并返回总和为 target 的元素组合的个数
 * F(i) = F(i) + F(target - i), i = [1...target]
 */

function combinationSum4(nums, target) {
  var n = nums.length,
    dp = new Array(target + 1).fill(0);

  dp[0] = 1;

  for (var i = 1; i <= target; i++) {
    for (var j = 0; j < n; j++) {
      if (i >= nums[j]) {
        dp[i] = dp[i] + dp[i - nums[j]];
      }
    }
  }

  return dp[target];
}
