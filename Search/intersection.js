/**
 * 给定两个数组 nums1 和 nums2 ，返回它们的交集
 * 输出结果中的每个元素一定是唯一的，可以不考虑输出结果的顺序
 */

function intersection1(nums1, nums2) {
  var set = new Set(),
    res = new Set();

  for (var i = 0; i < nums1.length; i++) {
    set.add(nums1[i]);
  }

  for (var i = 0; i < nums2.length; i++) {
    if (set.has(nums2[i])) {
      res.add(nums2[i]);
    }
  }

  return Array.from(res);
}

// set 初始化可以传值，可以进一步优化
function intersection2(nums1, nums2) {
  var set = new Set(nums1),
    res = new Set();

  for (var i = 0; i < nums2.length; i++) {
    if (set.has(nums2[i])) {
      res.add(nums2[i]);
    }
  }

  return Array.from(res);
}

// 变种1：如果数组初始有序，假设是递增
function intersection3(nums1, nums2) {
  var i = 0,
    j = 0,
    res = new Set();

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] === nums2[j]) {
      res.add(nums1[i]);
      i++;
      j++;
    } else if (nums1[i] < nums2[j]) {
      i++;
    } else {
      j++;
    }
  }

  return Array.from(res);
}
