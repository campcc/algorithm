/**
 * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。计算并返回可以凑成总金额所需的 最少的硬币个数
 * 1. dp[j] 定义为凑足金额为 j 所需的最小硬币个数
 * 2. 确定上一个，凑足金额为 j - conis[i] 所需的最小硬币个数，也就是 dp[j] = dp[j-coins[i]] + 1
 * 3. 所以递推公式为, dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1)
 */

function coinChange(coins, amount) {
  var dp = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER);

  dp[0] = 0;

  for (var i = 0; i < coins.length; i++) {
    for (var j = coins[i]; j <= amount; j++) {
      dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
    }
  }

  return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
}
