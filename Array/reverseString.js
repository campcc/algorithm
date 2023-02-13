/**
 * 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出
 * 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题
 */

// 最容易想到的是用额外的 O(n) 辅助空间，倒序遍历数组
function reverseString1(s) {
  var i = 0,
    n = s.length,
    reverse = [];

  while (i < n) {
    reverse.push(s[n - 1 - i]);
    i++;
  }

  for (var i = 0; i < n; i++) {
    s[i] = reverse[i];
  }

  return s;
}

// 题设要求我们需要原地修改数组，使用 O(1) 的额外空间
// 我们可以使用交换元素的方式，借助双指针进行一次遍历即可完成
function reverseString2(s) {
  var l = 0,
    r = s.length - 1;

  while (l < r) {
    swap(s, l, r);
    l++;
    r--;
  }

  return s;
}

function swap(s, i, j) {
  var temp = s[i];
  s[i] = s[j];
  s[j] = temp;
}

// 变种1： 给你一个字符串 s ，仅反转字符串中的所有元音字母，并返回结果字符串
// 元音字母包括 'a'、'e'、'i'、'o'、'u'，且可能以大小写两种形式出现不止一次
function reverseVowels(s) {
  var l = 0,
    r = s.length - 1;

  while (l < r) {
    while (l < r && !isVowels(s[l])) {
      l++;
    }

    while (l < r && !isVowels(s[r])) {
      r--;
    }

    if (l < r) {
      swap(s, l, r);
      l++;
      r--;
    }
  }

  return s;
}

function isVowels(char) {
  return /[aeiouAEIOU]/g.test(char);
}

console.log(reverseVowels("hello"));
