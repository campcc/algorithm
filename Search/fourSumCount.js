/**
 * 给你四个整数数组 nums1、nums2、nums3 和 nums4 ，数组长度都是 n ，请你计算有多少个元组 (i, j, k, l) 能满足：
 * 0 <= i, j, k, l < n
 * nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0
 * nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2] // 2
 * nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0] // 1
 */

function fourSumCount(nums1, nums2, nums3, nums4) {
  var map = new Map(),
    count = 0;

  // 初始化哈希表，计算 nums1, nums2 中两数之和及对应的次数
  nums1.forEach((a) => nums2.forEach((b) => map.set(a + b, (map.get(a + b) || 0) + 1)));

  for (var c of nums3) {
    for (var d of nums4) {
      if (map.has(-c - d)) {
        // 如果四数之和等于 0，满足的元组数就是 map 中两数和的次数
        count += map.get(-c - d);
      }
    }
  }

  return count;
}

fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2]);
