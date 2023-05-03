/**
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度
 */

// 动态规划
// 定义 F(i) 为前 i 个数字的最长上升子序列的长度，在 [0, i] 中寻找子序列，以 j 为分割点，满足
// F(i) = max(1 + F(j) if nums[i] > nums[j]), j < i
function lengthOfLIS(nums) {
  var n = nums.length,
    dp = new Array(n).fill(1);

  for (var i = 1; i < n; i++) {
    for (var j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], 1 + dp[j]);
      }
    }
  }

  var res = 1;
  for (var i = 0; i < dp.length; i++) {
    res = Math.max(res, dp[i]);
  }
  return res;
}

// 贪心，二分查找
function lengthOfLIS(nums) {}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));
