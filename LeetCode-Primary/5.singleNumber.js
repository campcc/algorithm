/**
 * 136. 只出现一次的数字
 * 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素
 * 时间复杂度要求 O(n)，空间复杂度要求 O(1)
 */

// 位运算，利用异或特性
// 1. a ^ a = 0
// 2. a ^ 0 = a
// 3. a ^ b = b ^ a
function singleNumber(nums) {
  var single = 0;

  for (var i = 0; i < nums.length; i++) {
    single ^= nums[i];
  }

  return single;
}
