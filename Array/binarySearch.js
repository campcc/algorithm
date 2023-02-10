/**
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target
 * 写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1
 */

// 二分进行递归查找
function binarySearch1(nums, target) {
  var search = function (nums, l, r, target) {
    if (l > r) {
      return -1;
    }

    var mid = l + Math.floor((r - l) / 2);

    if (nums[mid] > target) {
      return search(nums, l, mid - 1, target);
    } else if (nums[mid] < target) {
      return search(nums, mid + 1, r, target);
    } else {
      return mid;
    }
  };

  return search(nums, 0, nums.length, target);
}

// 也可以使用循环迭代，需要注意循环不变量，比如下面的代码中，我们的循环不变量就是闭区间 [0, nums.length - 1]
function binarySearch2(nums, target) {
  // 在 [0, nums.length -1] 的闭区间中进行查找
  var l = 0,
    r = nums.length - 1;

  // l === r 时，区间仍然成立
  while (l <= r) {
    var mid = l + Math.floor((r - l) / 2); // 避免整型相加溢出

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return -1;
}

// 理解了循环不变量，即使改变区间开闭，指针变量也能写出正确的代码，
// 比如下面我们将区间设置为 [0, nums.length) 前闭后开
function binarySearch3(nums, target) {
  var l = 0,
    r = nums.length;

  // l === r 时，区间不成立
  while (l < r) {
    var mid = l + Math.floor((r - l) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      r = mid; // 如果目标值比 nums[mid] 小，说明目标值在区间 [0, mid - 1] 内，我们的设置的区间是前闭后开，也就是 [0, r)，所以这里 r 应该为 mid
    } else {
      l = mid + 1;
    }
  }

  return -1;
}
