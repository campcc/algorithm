/**
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
 * 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额
 */

// 递归，考虑偷或不偷当前位置
function rob(nums) {
  var n = nums.length;

  if (n === 0) {
    return 0;
  }

  var dfs = (i) => {
    if (i >= n) {
      return 0;
    }

    // 1.偷当前位置 i，下一间必须从 i + 2 开始
    // 2.不偷当前位置，从 i + 1 开始
    return Math.max(nums[i] + dfs(i + 2), dfs(i + 1));
  };

  return dfs(0);
}

// 递归，记忆化搜索
function rob(nums) {
  var n = nums.length,
    memo = [];

  if (n === 0) {
    return 0;
  }

  var dfs = (i) => {
    if (memo[i]) {
      return memo[i];
    }

    if (i >= n) {
      return 0;
    }

    memo[i] = Math.max(nums[i] + dfs(i + 2), dfs(i + 1));

    return memo[i];
  };

  return dfs(0);
}

// 即使是递归，记忆化搜索，在数据量大的情况下仍然会有很高的超时风险，我们可以考虑动态规划
// 思路1，我们可以将 dp[i] 定义为第 i 个位置开始，能偷窃到的最高金额，与递归函数定义一致
// 由于我们需要计算 dp[i + 2] 和 dp[i + 1]，可以考虑将 dp 数组长度声明为 n + 2，初始填充为 0
// 考虑从最后一间房子 n 开始，递推到 0，dp[0] 就是最高的金额
function rob(nums) {
  var n = nums.length,
    dp = new Array(n + 2).fill(0);

  if (n === 0) {
    return 0;
  }

  for (var i = n - 1; i >= 0; i--) {
    dp[i] = Math.max(nums[i] + dp[i + 2], dp[i + 1]);
  }

  return dp[0];
}

// 思路2，我们考虑直接将 dp[i] 定义为位置 i 处能偷窃到的最高金额
function rob(nums) {
  var n = nums.length,
    dp = new Array(n).fill(0);

  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (var i = 2; i < n; i++) {
    dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
  }

  return dp[n - 1];
}

// 变种1：如果房屋围成了一圈
function rob2(nums) {}
