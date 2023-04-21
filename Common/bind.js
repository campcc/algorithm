/**
 * 模拟 bind 实现
 */

var value = 2;

var obj = {
  value: 1,
};

function foo(name, age) {
  this.habit = "shopping";
  console.log(this.value);
  console.log(name);
  console.log(age);
}

foo.prototype.friend = "kevin";

// 原理：返回一个新函数，新函数在调用时，bind 的第一个参数作为运行时的 this，后续的参数作为新函数调用的参数
// 需要注意的点，
// 1. 返回的新函数可能有返回值
// 2. bind 时支持传参，返回的函数依然支持传参，需要拼接两个 arguments
// 3. 返回的新函数可以使用 new 进行实例化，此时绑定的 this 会失效，但传入的参数依然生效，需要将调用时 this 绑定为调用函数的 this
// 4. 返回的新函数使用 new 实例化时，应该继承调用函数原型上的属性，我们需要在绑定时进行

Function.prototype._bind = function (context) {
  if (typeof this !== "function") {
    throw new Error("what is trying to be bound is not callable");
  }

  var self = this,
    args = Array.prototype.slice.call(arguments, 1);

  var bindFunc = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    var bindThis = this instanceof bindFunc ? this : context;
    return self.apply(bindThis, args.concat(bindArgs));
  };

  bindFunc.prototype = Object.create(this.prototype);

  return bindFunc;
};

var bar = foo._bind(obj, "monch");
var baz = new bar(18);
console.log(baz.friend);
