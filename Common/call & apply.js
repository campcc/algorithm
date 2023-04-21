/**
 * 模拟 call 实现，ES3 方法
 */

var name = "kevin";

var obj = {
  name: "monch",
};

function foo(age) {
  console.log(this.name);
  return {
    name: this.name,
    age,
  };
}

// 思路，在绑定的 this 上挂载一个函数，执行并返回结果
// 需要注意的一些点，
// 1. this 如果为 null 非严格模式下绑定到全局对象
// 2. 挂载的函数名需唯一，不能覆盖 this 上原有的属性
// 3. 函数调用可以使用：（1）直接调用 （2）eval

Function.prototype._call = function (context) {
  var defaultContext = typeof window === "object" ? window : globalThis;

  var symbol = Symbol();

  context = context || defaultContext;
  context[symbol] = this;

  var args = [];
  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  var result = context[symbol](...args);
  delete context[symbol];
  return result;
};

/**
 * 模拟 apply 实现
 */

Function.prototype._apply = function (context) {
  var defaultContext = typeof window === "object" ? window : globalThis;

  context = context || defaultContext;

  var symbol = Symbol(),
    args = arguments[1] || [];

  context[symbol] = this;

  var result = context[symbol](...args);
  delete context[symbol];
  return result;
};

var res1 = foo._call(obj, 18);
var res2 = foo._apply(obj, [18]);
console.log(res1, res2);
