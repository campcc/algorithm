/**
 * 电话号码的字母组合
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回
 * 给出的数字到字母的映射与电话按键相同
 */

function letterCombinations(digits) {
  if (digits === "") {
    return [];
  }

  var letterMap = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"],
    res = [];

  var dfs = (digits, index, combination) => {
    if (index === digits.length) {
      res.push(combination);
    } else {
      var char = digits[index],
        letters = letterMap[char];

      for (var i = 0; i < letters.length; i++) {
        dfs(digits, index + 1, combination + letters[i]);
      }
    }
  };

  dfs(digits, 0, "");

  return res;
}
