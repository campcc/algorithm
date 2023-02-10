/**
 * 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，
 * 另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目
 * 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列，
 * 最终，合并后数组不应由函数返回，而是存储在数组 nums1 中
 */

// 将数组 nums2 放进 nums1 的尾部，然后对 nums1 进行排序
function mergeSortedArray1(nums1, m, nums2, n) {
  nums1.splice(m, nums1.length - m, ...nums2);
  nums1.sort((a, b) => a - b);
  return nums1;
}

// 用额外的 O(n) 空间存放已排序元素，依次将 nums1，nums2 元素放进数组，最后赋值给 nums1
function mergeSortedArray2(nums1, m, nums2, n) {
  var i = 0,
    j = 0,
    cur,
    sorted = new Array(m + n);

  while (i < m || j < n) {
    if (i === m) {
      cur = nums2[j++];
    } else if (j === n) {
      cur = nums1[i++];
    } else if (nums1[i] <= nums2[j]) {
      cur = nums1[i++];
    } else {
      cur = nums2[j++];
    }

    sorted[i + j - 1] = cur;
  }

  for (var i = 0; i < m + n; i++) {
    nums1[i] = sorted[i];
  }

  return nums1;
}

// 用尾指针进行遍历，将较大的元素依次插入 nums1
function mergeSortedArray3(nums1, m, nums2, n) {
  var i = m - 1,
    j = n - 1,
    tail = m + n - 1,
    cur;

  while (i >= 0 || j >= 0) {
    if (i < 0) {
      cur = nums2[j--];
    } else if (j < 0) {
      cur = nums1[i--];
    } else if (nums1[i] < nums2[j]) {
      cur = nums2[j--];
    } else {
      cur = nums1[i--];
    }

    nums1[tail--] = cur;
  }
}
