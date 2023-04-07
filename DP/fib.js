/**
 * 斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和
 * 给定 n ，请计算 F(n)
 */

// 动态规划的经典题目

// 递归，记忆化搜索
// 自上向下
var memo = [];

function fib(n) {
  if (n === 0) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  if (memo[n] === undefined) {
    memo[n] = fib(n - 1) + fib(n - 2);
  }

  return memo[n];
}

// 动态规划，自下而上
function fib(n) {
  var memo = [];

  memo[0] = 0;
  memo[1] = 1;

  for (var i = 2; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }

  return memo[n];
}

console.log(fib(2));

// 动态规划
// 本质就是也是递归问题
// 1.递归问题存在重叠子问题
// 2.自顶向下解决问题，叫记忆化搜索
// 3.自底向上解决问题，叫动态规划
