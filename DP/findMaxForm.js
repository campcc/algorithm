/**
 * 给你一个二进制字符串数组 strs 和两个整数 m 和 n
 * 请你找出并返回 strs 的最大子集的长度，该子集中 最多 有 m 个 0 和 n 个 1
 * strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3 // 4, ["10", "0001", "1", "0"]
 * F(i, m, n) = Math.max(F(i - 1, m, n), F(i - 1, m - zeros, n - ones) + 1)
 */

function findMaxForm(strs, m, n) {
  var len = strs.length,
    dp = new Array(len + 1).fill(0).map(() => new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0)));

  for (var i = 1; i <= len; i++) {
    var [zeros, ones] = getZerosOnes(strs[i - 1]);
    for (var j = 0; j <= m; j++) {
      for (var k = 0; k <= n; k++) {
        dp[i][j][k] = dp[i - 1][j][k];
        if (j >= zeros && k >= ones) {
          dp[i][j][k] = Math.max(dp[i - 1][j][k], dp[i - 1][j - zeros][k - ones] + 1);
        }
      }
    }
  }

  return dp[len][m][n];
}

function getZerosOnes(str) {
  var res = [0, 0];

  for (var i = 0; i < str.length; i++) {
    if (str[i] === "0") {
      res[0]++;
    }
    if (str[i] === "1") {
      res[1]++;
    }
  }
  return res;
}

console.log(findMaxForm(["10", "0001", "111001", "1", "0"], 5, 3));
