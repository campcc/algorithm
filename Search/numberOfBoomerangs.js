/**
 * 给定平面上 n 对 互不相同 的点 points ，其中 points[i] = [xi, yi]
 * 回旋镖 是由点 (i, j, k) 表示的元组 ，其中 i 和 j 之间的距离和 i 和 k 之间的欧式距离相等（需要考虑元组的顺序）
 * 返回平面上所有回旋镖的数量
 * 1 <= n <= 500
 * 所有点都 互不相同
 * points = [[0,0],[1,0],[2,0]] // 2, [[1,0],[0,0],[2,0]] 和 [[1,0],[2,0],[0,0]]
 */

// 枚举所有点，哈希表记录点之间的距离
function numberOfBoomerangs(points) {
  var len = points.length,
    res = 0;

  // 枚举所有的点，记录距离
  for (var i = 0; i < len; i++) {
    var map = new Map();
    for (var j = 0; j < len; j++) {
      if (i !== j) {
        var distance = getDistance(points[i], points[j]);
        map.set(distance, (map.get(distance) || 0) + 1);
      }
    }

    // 排列，从 n 个元素中选 2 个不同元素的排列数
    for (var count of map.values()) {
      if (count > 1) {
        res += count * (count - 1);
      }
    }
  }

  return res;
}

function getDistance(p1, p2) {
  return (p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]);
}
