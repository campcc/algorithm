/**
 * 编写一个算法来判断一个数 n 是不是快乐数
 * 输入：n = 19
 * 输出：true
 * 解释：
 * 1^2 + 9^2 = 82
 * 8^2 + ^2^2 = 68
 * 6^2 + 8^2 = 100
 * 1^2 + 0^2 + 0^2 = 1
 */

// 哈希表
function isHappy(n) {
  var map = new Map();

  while (n !== 1 && !map.has(n)) {
    map.set(n, 1);
    n = getNext(n);
  }

  return n === 1;
}

// 快慢指针
function isHappy(n) {
  var slow = n,
    fast = getNext(n);

  while (fast !== 1 && fast !== slow) {
    slow = getNext(slow);
    fast = getNext(getNext(fast));
  }

  return fast === 1;
}

function getNext(n) {
  var sum = 0;

  while (n > 0) {
    var remainder = n % 10;
    sum += remainder * remainder;
    n = Math.floor(n / 10);
  }

  return sum;
}
