/**
 * 给定一种规律 pattern 和一个字符串 s ，判断 s 是否遵循相同的规律
 * pattern = "abba", s = "dog cat cat dog" // true
 * pattern = "abba", s = "dog cat cat fish" // false
 * pattern = "aaaa", s = "dog cat cat dog" // false
 */

// 双射
function wordPattern1(pattern, s) {
  var map1 = new Map(),
    map2 = new Map(),
    words = s.split(" ");

  if (pattern.length !== words.length) {
    return false;
  }

  for (var i = 0; i < words.length; i++) {
    var word = words[i],
      p = pattern[i];

    if ((map1.has(word) && map1.get(word) !== p) || (map2.has(p) && map2.get(p) !== word)) {
      return false;
    }

    map1.set(word, p);
    map2.set(p, word);
  }

  return true;
}

// 比较索引值
function wordPattern2(pattern, s) {
  pattern = pattern.split("");

  var words = s.split(" "),
    len = words.length;

  if (pattern.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    if (pattern.indexOf(pattern[i]) !== words.indexOf(words[i])) {
      return false;
    }
  }

  return true;
}

wordPattern1("abba", "dog cat cat dog");
