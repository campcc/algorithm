/**
 * 350. 两个数组的交集 II
 * 给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集
 */

// 哈希表，Map 存储数字频率
function intersect(nums1, nums2) {
  var map = new Map(),
    res = [];

  for (var num of nums1) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  for (var num of nums2) {
    var frequency = map.get(num) || 0;

    if (frequency > 0) {
      res.push(num);
      map.set(num, frequency - 1);
    }
  }

  return res;
}

// 排序 + 双指针
// 排序后，两个指针从两个数组的头部开始，每次比较指针指向的数字，如果相等，同时前进，如果不等，数值较小的指针前进，直到其中一个指针越界
function intersect(nums1, nums2) {
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);

  var i = 0,
    j = 0,
    res = [];

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      res.push(nums1[i]);
      i++;
      j++;
    } else if (nums1[i] < nums2[j]) {
      i++;
    } else {
      j++;
    }
  }

  return res;
}
