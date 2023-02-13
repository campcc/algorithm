/**
 * 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i])
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水
 * 返回容器可以储存的最大水量
 */

// 盛水最多就是面积最大，最容易想到的就是暴力解法
function maxArea1(height) {
  var n = height.length,
    areas = [];

  for (var i = 0; i < n; i++) {
    for (j = i + 1; j < n; j++) {
      var w = j - i,
        h = Math.min(height[i], height[j]);
      areas.push(w * h);
    }
  }

  return Math.max(...areas);
}

// 双指针，这里我们可以使用头尾指针，
// 头尾指针一开始容器的底是最大的，接下来不管我们移动哪一个指针，容器底都会减小，我们只需要考虑高度的变化，
// 为了使面积最大，我们需要选择保留较高的边，放弃较短的边，以获得有更高的边的机会
function maxArea2(height) {
  var l = 0,
    r = height.length - 1,
    max = 0;

  while (l <= r) {
    var area = Math.min(height[l], height[r]) * (r - l);

    if (area > max) max = area;

    // 移动较短的边
    if (height[l] <= height[r]) {
      l++;
    } else {
      r--;
    }
  }

  return max;
}
