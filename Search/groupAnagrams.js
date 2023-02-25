/**
 * 给你一个字符串数组，请你将 字母异位词 组合在一起
 * 可以按任意顺序返回结果列表
 * strs[i] 仅包含小写字母
 * strs = ["eat", "tea", "tan", "ate", "nat", "bat"] // [["bat"],["nat","tan"],["ate","eat","tea"]]
 */

// 排序，排序后的字符作为哈希表的键
function groupAnagrams1(strs) {
  var map = new Map();

  for (var str of strs) {
    var key = Array.from(str).sort().toString();
    if (map.has(key)) {
      map.get(key).push(str);
    } else {
      map.set(key, [str]);
    }
  }

  return Array.from(map.values());
}

// 计数，以单词的频率数组作为哈希表的键
// Map(3) {
//  '1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0' => [ 'eat', 'tea', 'ate' ],
//  '1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0' => [ 'tan', 'nat' ],
//  '1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0' => [ 'bat' ]
// }
function groupAnagrams2(strs) {
  var map = new Map();

  for (var str of strs) {
    var frequency = new Array(26).fill(0);

    for (var char of str) {
      frequency[char.charCodeAt() - "a".charCodeAt()]++;
    }

    var key = frequency.toString();

    if (map.has(key)) {
      map.get(key).push(str);
    } else {
      map.set(key, [str]);
    }
  }

  return Array.from(map.values());
}
