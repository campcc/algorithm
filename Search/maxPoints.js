/**
 * 给你一个数组 points ，其中 points[i] = [xi, yi] 表示 X-Y 平面上的一个点
 * 求最多有多少个点在同一条直线上
 * 1 <= points.length <= 300
 * points 中的所有点 互不相同
 * points = [[1,1],[2,2],[3,3]] // 3
 */

// 「点斜式」，一个点加一个斜率可唯一确定一条直线
// 对 [点] 进行分类，经过某个点的直线，哪条直线上的点最多
// 可以用哈希表计数，斜率作为 key，枚举所有的点
// 需要注意的点：
// 1. 斜率是小数存在浮点数误差问题，可以转换为分数表示，将约分后的分数作为哈希键
// 2. 如果有重复点，约分后会出现除 0，我们需要跳过重复点
function maxPoints(points) {
  var len = points.length,
    res = 0;

  if (len < 3) {
    return len;
  }

  // 枚举所有的点
  for (var i = 0; i < len; i++) {
    var max = 0,
      duplicate = 0,
      map = new Map();

    for (var j = i + 1; j < len; j++) {
      // 计算斜率 daltaX / deltaY，这里为了避免浮点数问题，我们使用分数表示斜率
      var x = points[j][0] - points[i][0];
      var y = points[j][1] - points[i][1];

      // 跳过重复的点，避免下面约分时除数变成了 0
      if (x === 0 && y === 0) {
        duplicate++;
        continue;
      }

      // 计算最大公约数，进行约分化简，将化简后的值作为哈希键，
      // 这里 key 相同即代表两点的斜率相同，在同一直线
      var gcd = getGcd(x, y);
      x = x / gcd;
      y = y / gcd;
      var key = x + "@" + y;
      map.set(key, (map.get(key) || 0) + 1);

      // 枚举所有的 point[i] 与其他点的斜率值，找到斜率值频率最高的
      max = Math.max(max, map.get(key));
    }

    // 最终求解的点的个数就是斜率最大值对应的点个数 + 当前点 + 重复点
    res = Math.max(res, max + duplicate + 1);
  }

  return res;
}

// 求最大公约数，辗转相除
// gcd(a, b) = gcd(b, a mod b)
function getGcd(a, b) {
  return b !== 0 ? getGcd(b, a % b) : a;
}
