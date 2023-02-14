/**
 * 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引
 * 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）
 * 不考虑答案输出的顺序
 */

// 固定长度的滑动窗口
function findAnagrams1(s, p) {
  var sLen = s.length,
    pLen = p.length,
    l = 0,
    res = [];

  if (sLen < pLen) {
    return [];
  }

  while (l < sLen - pLen + 1) {
    if (isAnagrams(s, l, p)) {
      res.push(l);
    }
    l++;
  }

  return res;
}

function isAnagrams(s, l, p) {
  var count = new Array(26).fill(0),
    differ = 0;

  for (var i = 0; i < p.length; i++) {
    count[s[l + i].charCodeAt() - "a".charCodeAt()]++;
    count[p[i].charCodeAt() - "a".charCodeAt()]--;
  }

  for (var i = 0; i < 26; i++) {
    if (count[i] !== 0) {
      differ++;
    }
  }

  return differ === 0;
}

// 优化的滑动窗口
function findAnagrams2(s, p) {
  var sLen = s.length,
    pLen = p.length,
    sCount = new Array(26).fill(0),
    pCount = new Array(26).fill(0),
    baseCharCode = "a".charCodeAt(),
    res = [];

  if (sLen < pLen) {
    return [];
  }

  for (var i = 0; i < pLen; i++) {
    pCount[p[i].charCodeAt() - baseCharCode]++;
    sCount[s[i].charCodeAt() - baseCharCode]++;
  }

  if (isEqual(sCount, pCount)) {
    res.push(0);
  }

  for (var i = pLen; i < sLen; i++) {
    sCount[s[i - pLen].charCodeAt() - baseCharCode]--;
    sCount[s[i].charCodeAt() - baseCharCode]++;

    if (isEqual(sCount, pCount)) {
      res.push(i - pLen + 1);
    }
  }

  return res;
}

function isEqual(sCount, pCount) {
  var differ = 0;

  for (var i = 0; i < 26; i++) {
    if (sCount[i] !== pCount[i]) {
      differ++;
    }
  }

  return differ === 0;
}
