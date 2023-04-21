/**
 * 模拟 new 操作符
 */

// 原理：调用构造函数，绑定原型，返回一个实例

// 方式1
function _new(constructor, ...args) {
  var obj = Object.create(constructor.prototype);
  var result = constructor.apply(obj, args);
  return typeof result === "object" ? result : obj;
}

// 方式2
function _new() {
  var obj = Object.create(null);
  var constructor = [].shift.call(arguments);
  Object.setPrototypeOf(obj, constructor.prototype);
  var result = constructor.apply(obj, arguments);
  return typeof result === "object" ? result : obj;
}

function Foo(name) {
  this.name = name;
}

Foo.prototype.sayName = function () {
  console.log(this.name);
};

var foo = _new(Foo, "monch");
foo.sayName();
