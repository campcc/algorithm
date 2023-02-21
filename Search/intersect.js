/**
 * 给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集
 * 返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）
 * 可以不考虑输出结果的顺序
 */

function intersect(nums1, nums2) {
  var map = new Map(),
    res = [];

  for (var i = 0; i < nums1.length; i++) {
    map.set(nums1[i], (map.get(nums1[i]) || 0) + 1);
  }

  for (var i = 0; i < nums2.length; i++) {
    var frequency = map.get(nums2[i]) || 0;

    if (frequency > 0) {
      res.push(nums2[i]);
      map.set(nums2[i], frequency - 1);
    }
  }

  return res;
}

// 变种1：如果初始数组是有序的，假设是递增的，可以使用双指针进行查找
function intersect2(nums1, nums2) {
  var i = 0,
    j = 0,
    res = [];

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] > nums2[j]) {
      j++;
    } else if (nums1[i] === nums2[j]) {
      res.push(nums1[i]);
    } else {
      i++;
    }
  }
}

// 变种2：如果 nums1 的大小比 nums2 小，
// 可以考虑将较小的数组进行哈希计数，然后在另一个数组中用哈希来查找
function intersect3(nums1, nums2) {
  var map = new Map(),
    res = [];

  for (var val of nums1) {
    map.set(val, (map.get(val) || 0) + 1);
  }

  for (var val of nums2) {
    var frequency = map.get(val) || 0;

    if (frequency > 0) {
      res.push(val);
      map.set(val, frequency - 1);
    }
  }

  return res;
}

// 变种3：如果 nums2 的元素存储在磁盘上，内存是有限的，并且你不能一次加载所有的元素到内存中，
// 可以考虑通过归并外排将两个数组排序后再使用排序双指针查找
function intersect4(nums1, nums2) {}
