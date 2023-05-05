/**
 * 122. 买卖股票的最佳时机 II
 * 给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。
 * 在每一天，你可以决定是否购买和/或出售股票。你在任何时候最多只能持有一股股票。你也可以先购买，然后在同一天出售。
 * 返回你能获得的最大利润 。
 */

// 动态规划，dp(i, j) 定义为交易的第 i 天，持股状态为 j 时，能获得的最大利润
// 1. 持股状态只有两种，持股或不持股，我们用 1, 0 表示
// 2. 考虑第 i 天持股，如果当天没有交易，说明持股来自于前一天，如果当天买入了股票，说明前一天没持股，取两者最大值，dp[i][1] = Math.max(dp[i-1][1] + dp[i-1][0] - prices[i])
// 3. 考虑第 i 天不持股，如果当天没有交易，取前一天的利润，前一天可能持股或不持股，很明显不持股利润最大，如果当天卖出股票，说明前一天持股了，取这两种情况的最大值，dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i])
// 4. 初始值，考虑第一天持股或不持股，dp[0][1] = -prices[0], dp[0][0] = 0
function maxProfit(prices) {
  var n = prices.length,
    dp = new Array(n).fill(0).map(() => new Array(2).fill(0));

  if (n < 2) {
    return 0;
  }

  dp[0][0] = 0;
  dp[0][1] = -prices[0];

  for (var i = 1; i < n; i++) {
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
  }

  return dp[n - 1][0];
}

// dp 优化，上述持股状态只有两个，可以考虑用两个变量存储，无需二维数组
function maxProfit(prices) {
  var n = prices.length,
    hold = -prices[0],
    noHold = 0;

  if (n < 2) {
    return 0;
  }

  for (var i = 1; i < n; i++) {
    hold = Math.max(hold, noHold - prices[i]);
    noHold = Math.max(noHold, hold + prices[i]);
  }

  return noHold;
}

// 贪心求解，假设股票一直上涨，只需要找到上涨的最大值和开始上涨的最小值计算差值就是最大利润，下跌时不用计算，问题转化为
// 求股票上涨阶段的利润累加和
function maxProfit(prices) {
  var n = prices.length,
    sum = 0;

  if (n < 2) {
    return 0;
  }

  for (var i = 1; i < n; i++) {
    var differ = prices[i] - prices[i - 1];
    if (differ > 0) {
      sum += differ;
    }
  }

  return sum;
}
