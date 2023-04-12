/**
 * 给定两个字符串 s 和 t ，判断它们是否是同构的
 * s = "egg", t = "add" // true
 * s = "foo", t = "bar" // false
 * s = "paper", t = "title" // true
 */

// 双映射，维护两个哈希表进行比较
function isIsomorphic(s, t) {
  var map1 = {},
    map2 = {};

  if (s.length !== t.length) {
    return false;
  }

  for (var i = 0; i < s.length; i++) {
    var s1 = s[i],
      t1 = t[i];

    if ((map1[s1] && map1[s1] !== t1) || (map2[t1] && map2[t1] !== s1)) {
      return false;
    }

    map1[s1] = t1;
    map2[t1] = s1;
  }

  return true;
}

// 比较索引值
function isIsomorphic(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  for (var i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) !== t.indexOf(t[i])) {
      return false;
    }
  }

  return true;
}
