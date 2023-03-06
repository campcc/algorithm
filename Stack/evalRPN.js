/**
 * 给你一个字符串数组 tokens ，表示一个根据 逆波兰表示法 表示的算术表达式
 * 请你计算该表达式。返回一个表示表达式值的整数
 * 两个整数之间的除法总是 向零截断
 * tokens = ["2","1","+","3","*"] // ((2 + 1) * 3) = 9
 */

function evalRPN(tokens) {
  var stack = [];

  for (var token of tokens) {
    if (isNumber(token)) {
      stack.push(+token);
    } else {
      var num2 = stack.pop();
      var num1 = stack.pop();
      if (token === "+") {
        stack.push(num1 + num2);
      } else if (token === "-") {
        stack.push(num1 - num2);
      } else if (token === "*") {
        stack.push(num1 * num2);
      } else if (token === "/") {
        stack.push(num1 / num2 > 0 ? Math.floor(num1 / num2) : Math.ceil(num1 / num2));
      }
    }
  }

  return stack.pop();
}

function isNumber(token) {
  return !(token === "+" || token === "-" || token === "*" || token === "/");
}

console.log(evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]));
