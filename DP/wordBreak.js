/**
 * 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s
 * s = "leetcode", wordDict = ["leet", "code"] // true
 * 字符串的前 i 个字符组成的字符串是否能利用字典中的单词拼出
 * 考虑一个分割点 j，j = [0...i - 1]，如果 F(j) 满足，我们只需要判断后半段的字符串 s[j...i - 1] 在字典中即可
 * F(i) = F(j) && check(s[j...i - 1])
 */

function wordBreak(s, wordDict) {
  var n = s.length,
    dp = new Array(n + 1).fill(false);

  dp[0] = true;

  for (var i = 1; i <= n; i++) {
    for (var j = 0; j < i; j++) {
      if (dp[j] && wordDict.indexOf(s.substring(j, i)) !== -1) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[n];
}

console.log(wordBreak("leetcode", ["leet", "code"]));
