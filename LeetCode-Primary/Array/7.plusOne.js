/**
 * 66. 加一
 * 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一
 * digits = [1, 2, 3] // [1, 2, 4]
 */

// 逆序遍历，判断加一后是否为 0，加一后为 0 继续更新下一位
function plusOne(digits) {
  var n = digits.length;

  for (var i = n - 1; i >= 0; i--) {
    digits[i] = (digits[i] + 1) % 10;
    if (digits[i] !== 0) {
      return digits;
    }
  }

  digits.unshift(1);
  return digits;
}
