/**
 * 给定一个字符串 s ，根据字符出现的 频率 对其进行 降序排序
 * s 由大小写英文字母和数字组成
 * s = "tree" // eertr
 * s = "cccaaa" // cccaaa
 * s = "Aabb" // bbAa
 */

// 哈希表, 按照出现频率排序
function frequencySort1(s) {
  var map = new Map(),
    res = [];

  for (var i = 0; i < s.length; i++) {
    var char = s[i],
      frequency = map.get(char) || 0;
    map.set(char, frequency + 1);
  }

  var list = [...map.keys()].sort((a, b) => map.get(b) - map.get(a));

  for (var char of list) {
    var frequency = map.get(char);
    for (var i = 0; i < frequency; i++) {
      res.push(char);
    }
  }

  return res.join("");
}

// 桶排序
function frequencySort2(s) {
  var map = new Map(),
    maxFrequency = 0,
    res = [];

  for (var char of s) {
    var frequency = map.get(char) || 0;
    map.set(char, frequency + 1);
    maxFrequency = Math.max(maxFrequency, frequency + 1);
  }

  var buckets = new Array(maxFrequency + 1).fill(0).map(() => new Array());

  for (var [char, frequency] of map.entries()) {
    buckets[frequency].push(char);
  }

  for (var i = maxFrequency; i > 0; i--) {
    var bucket = buckets[i];
    for (var char of bucket) {
      for (var k = 0; k < i; k++) {
        res.push(char);
      }
    }
  }

  return res.join("");
}

// 优先队列
function frequencySort3(s) {}

// 最大堆
function frequencySort4(s) {}
