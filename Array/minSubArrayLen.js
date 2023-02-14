/**
 * 给定一个含有 n 个正整数的数组和一个正整数 target
 * 找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度
 * 如果不存在符合条件的子数组，返回 0
 */

// 通过滑动窗口求解，初始窗口内没有元素，我们可以判断窗口和与 target 的大小来决定移动哪个指针
// 如果窗口和小于 target，我们需要更多元素满足条件，此时移动右指针，直到找到一个解
// 找到解后我们还需要缩小窗口，因为当前窗口仍然存在可能的解，我们移动左指针继续寻找解，
// 循环退出的条件为：左右指针交替向前，直到左指针到达数组边界
function minSubArrayLen(target, nums) {
  var l = 0,
    r = -1,
    sum = 0,
    res = Infinity,
    n = nums.length;

  while (l < n) {
    if (sum < target) {
      r++;
      sum += nums[r];
    } else {
      sum -= nums[l];
      l++;
    }

    if (sum >= target) {
      res = Math.min(res, r - l + 1);
    }
  }

  return res === Infinity ? 0 : res;
}
