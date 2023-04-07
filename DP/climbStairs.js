/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢
 */

// 递归结构

// 递归，记忆化搜索
function climbStairs(n) {
  var memo = [];

  var calcWays = function (n) {
    if (n === 1) {
      return 1;
    }

    if (n === 2) {
      return 2;
    }

    if (!memo[n]) {
      memo[n] = calcWays(n - 1) + calcWays(n - 2);
    }

    return memo[n];
  };

  return calcWays(n);
}

// 动态规划，自底向上
function climbStairs(n) {
  var memo = [];

  memo[1] = 1;
  memo[2] = 2;

  for (var i = 3; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }

  return memo[n];
}
