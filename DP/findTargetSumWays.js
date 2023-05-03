/**
 * 给你一个整数数组 nums 和一个整数 target
 * 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式
 * nums = [1,1,1,1,1], target = 3 // 5
 * -1 + 1 + 1 + 1 + 1 = 3
 * +1 - 1 + 1 + 1 + 1 = 3
 * +1 + 1 - 1 + 1 + 1 = 3
 * +1 + 1 + 1 - 1 + 1 = 3
 * +1 + 1 + 1 + 1 - 1 = 3
 */

// 回溯
function findTargetSumWays(nums, target) {
  var res = 0;

  var dfs = (index, nums, target, sum) => {
    if (index === nums.length) {
      if (sum === target) {
        res++;
      }
      return;
    }

    dfs(index + 1, nums, target, sum + nums[index]);
    dfs(index + 1, nums, target, sum - nums[index]);
  };

  dfs(0, nums, target, 0);

  return res;
}

// 动态规划
// 定义 F(i)(j) 为考虑前 i 个数，计算结果为 j 的方案数，递推到 F(n)(target)
// 每个数字只能搭配 +、- 使用，状态转移为考虑 + 和 - 两种情况的总方案数
// F(i)(j) = F(i - 1)(j - nums[i - 1]) + F(i - 1)(j + nums[i - 1])
// 结果范围为 [-sum, sum]，对于负数数组索引，考虑增加一个 sum 的偏移量进行存储
function findTargetSumWays(nums, target) {
  var n = nums.length,
    sum = 0;

  for (var num of nums) {
    sum += num;
  }

  if (Math.abs(target) > sum) {
    return 0;
  }

  var dp = new Array(n + 1).fill(0).map(() => new Array(2 * sum + 1).fill(0));

  dp[0][0 + sum] = 1;

  for (var i = 1; i <= n; i++) {
    for (var j = -sum; j <= sum; j++) {
      if (j - nums[i - 1] + sum >= 0) {
        dp[i][j + sum] += dp[i - 1][j - nums[i - 1] + sum];
      }
      if (j + nums[i - 1] + sum <= 2 * sum) {
        dp[i][j + sum] += dp[i - 1][j + nums[i - 1] + sum];
      }
    }
  }

  return dp[n][target + sum];
}

console.log(findTargetSumWays([1, 1, 1, 1, 1], 3));
