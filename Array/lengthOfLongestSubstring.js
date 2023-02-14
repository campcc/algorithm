/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度
 */

// 滑动窗口
function lengthOfLongestSubstring(s) {
  var l = 0,
    r = -1,
    n = s.length,
    set = new Set(),
    res = 0;

  while (l < n) {
    // 如果右边界的下一个元素不重复，从右边界扩大窗口，标记扩大后的元素为重复元素
    if (!set.has(s[r + 1]) && r + 1 < n) {
      r++;
      set.add(s[r]);
    } else {
      // 如果右边界的下一个元素重复，从 set 中删除左边界元素，从左边界扩大窗口
      set.delete(s[l]);
      l++;
    }

    if (r - l + 1 > res) res = r - l + 1;
  }

  return res;
}
