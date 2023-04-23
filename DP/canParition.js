/**
 * 分割等和子集
 * 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 * nums = [1, 5, 11, 5] // true [1, 5, 5] [11]
 * F(n, c) 定义为将 n 个物品填满容量为 c 的背包, c = sum / 2
 * F(i, c) = F(i - 1, c) || F(i - 1, c - w[i])
 */

function canPartition(nums) {
  var sum = 0,
    n = nums.length;

  for (var i = 0; i < n; i++) {
    sum += nums[i];
  }

  if (sum % 2 !== 0) {
    return false;
  }

  // 尝试 nums[0...i] 的所有数字，是否可以完全填充一个容量为 c 的背包
  function partition(nums, i, c) {
    if (c === 0) {
      return true;
    }

    if (c < 0 || i < 0) {
      return false;
    }

    return partition(nums, i - 1, c) || partition(nums, i - 1, c - nums[i]);
  }

  return partition(nums, n - 1, sum / 2);
}

// 记忆化搜索
// memo[i][c], -1 初始值，1 填充，0 未填充
function canPartition(nums) {
  var sum = 0,
    n = nums.length,
    memo = new Array(n);

  for (var i = 0; i < n; i++) {
    sum += nums[i];
  }

  if (sum % 2 !== 0) {
    return false;
  }

  for (var i = 0; i < n; i++) {
    memo[i] = new Array(sum / 2 + 1).fill(-1);
  }

  function partition(nums, i, c) {
    if (c === 0) {
      return true;
    }

    if (c < 0 || i < 0) {
      return false;
    }

    if (memo[i][c] !== -1) {
      return memo[i][c] === 1;
    }

    memo[i][c] = partition(nums, i - 1, c) || partition(nums, i - 1, c - nums[i]) ? 1 : 0;

    return memo[i][c] === 1;
  }

  return partition(nums, i - 1, sum / 2);
}

// 动态规划
function canPartition(nums) {
  var n = nums.length,
    sum = 0;

  for (var i = 0; i < n; i++) {
    sum += nums[i];
  }

  if (sum % 2 !== 0) {
    return false;
  }

  var capacity = sum / 2,
    dp = new Array(capacity + 1).fill(false);

  // 只考虑第一个数字
  for (var j = 0; j <= capacity; j++) {
    dp[j] = nums[0] === j;
  }

  for (var i = 0; i < n; i++) {
    for (var j = capacity; j >= nums[i]; j--) {
      dp[j] = dp[j] || dp[j - nums[i]];
    }
  }

  return dp[capacity];
}

console.log(canPartition([1, 5, 11, 5]));
