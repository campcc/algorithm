/**
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词
 * 若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词
 * s = "anagram", t = "nagaram" // true
 * s = "rat", t = "car" // false
 */

// 排序
function isAnagram1(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  return [...s].sort().join("") === [...t].sort().join("");
}

// 哈希表
function isAnagram2(s, t) {
  var sLen = s.length,
    tLen = t.length,
    frequency = new Array(256).fill(0);

  if (sLen !== tLen) {
    return false;
  }

  for (var i = 0; i < sLen; i++) {
    frequency[s[i].charCodeAt() - "A".charCodeAt()]++;
  }

  for (var i = 0; i < tLen; i++) {
    frequency[t[i].charCodeAt() - "A".charCodeAt()]--;
  }

  return frequency.every((f) => f === 0);
}

// 哈希表优化，提前退出
function isAnagram3(s, t) {
  var sLen = s.length,
    tLen = t.length,
    frequency = new Array(256).fill(0);

  if (sLen !== tLen) {
    return false;
  }

  for (var i = 0; i < sLen; i++) {
    frequency[s[i].charCodeAt() - "A".charCodeAt()]++;
  }

  for (var i = 0; i < tLen; i++) {
    var index = t[i].charCodeAt() - "A".charCodeAt();

    frequency[index]--;

    if (frequency[index] < 0) {
      return false;
    }
  }

  return true;
}

// 哈希表优化，两个字符串长度相同，也可以只遍历一次
function isAnagram4(s, t) {
  var sLen = s.length,
    tLen = t.length,
    frequency = new Array(256).fill(0);

  if (sLen !== tLen) {
    return false;
  }

  for (var i = 0; i < sLen; i++) {
    frequency[s[i].charCodeAt() - "A".charCodeAt()]++;
    frequency[t[i].charCodeAt() - "A".charCodeAt()]--;
  }

  for (var i = 0; i < 256; i++) {
    if (frequency[i] !== 0) {
      return false;
    }
  }

  return true;
}
