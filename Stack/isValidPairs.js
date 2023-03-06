/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 每个右括号都有一个对应的相同类型的左括号。
 */

// 借助栈
function isValidPairs(s) {
  var len = s.length,
    stack = [];

  if (len % 2 !== 0) {
    return false;
  }

  var map = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  for (var char of s) {
    if (map[char]) {
      stack.push(char);
    } else {
      if (stack.length === 0) {
        return false;
      }

      var top = stack.pop();

      if (map[top] !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

var s = "()[]{}";
console.log(isValidPairs(s));
