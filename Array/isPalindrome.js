/**
 * 如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，
 * 短语正着读和反着读都一样, 则可以认为该短语是一个回文串
 * 字母和数字都属于字母数字字符
 * 给你一个字符串 s，如果它是 回文串 ，返回 true ；否则，返回 false
 */

// 我们可以先简单处理字符串，然后使用对撞双指针直接判断
function isPalindrome1(s) {
  s = s.replace(/[^A-Za-z0-9]/g, "").toLowerCase();

  if (s === "") return true;

  var l = 0,
    r = s.length - 1;

  while (l < r) {
    if (s[l] !== s[r]) {
      return false;
    }

    l++;
    r--;
  }
  return true;
}

// 实际上，我们也可以直接在原字符串 s 上使用双指针
// 每次移动时，指针移动到下一个字母或数字字符再进行比较即可
function isPalindrome2(s) {
  var l = 0,
    r = s.length - 1;

  while (l < r) {
    while (l < r && !isStringOrNumber(s[l])) {
      l++;
    }

    while (l < r && !isStringOrNumber(s[r])) {
      r--;
    }

    if (s[l].toLowerCase() !== s[r].toLowerCase()) {
      return false;
    }

    l++;
    r--;
  }

  return true;
}

function isStringOrNumber(char) {
  return /[a-zA-Z0-9]/g.test(char);
}
