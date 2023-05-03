/**
 * 435, 无重复区间
 */

// 贪心
function eraseOverlapIntervals(intervals) {
  if (!intervals.length) {
    return 0;
  }

  intervals.sort((a, b) => a[1] - b[1]);

  var n = intervals.length,
    right = intervals[0][1],
    res = 1;

  for (var i = 0; i < n; i++) {
    if (intervals[i][0] >= right) {
      res++;
      right = intervals[i][1];
    }
  }

  return n - res;
}

// 动态规划
// dp[i] 定义为以区间 i 为最后一个区间，可以选出的最大区间数量
function eraseOverlapIntervals(intervals) {
  var n = intervals.length,
    dp = new Array(n).fill(1);

  intervals.sort((a, b) => a[1] - b[1]);

  for (var i = 1; i < n; i++) {
    for (var j = 0; j < i; j++) {
      if (intervals[i][0] >= intervals[j][1]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return n - Math.max(...dp);
}
