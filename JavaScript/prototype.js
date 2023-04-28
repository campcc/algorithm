// 原型与原型链

// 1. 每个函数都有一个属性 prototype，代表构造函数的原型对象
// 2. 每个实例对象都有 __proto__ 属性，指向构造函数的原型对象
// 3. 每个原型对象中都有一个 constructor 属性，指向构造函数，标识了该原型对象是有哪个函数构造的
// 4. delete 关键字只能删除自身的属性，不能删除继承来的属性

// 基础原型链
function Fn1(name) {
  if (name) {
    this.name = name;
  }
}
Fn1.prototype.name = "jack";
var a = new Fn1();
console.log("a:", a.name); // a: jack

function Fn2(name) {
  this.name = name;
}
Fn2.prototype.name = "jack";
var b = new Fn2();
console.log("b:", b.name); // b: undefined

// 闭包结合原型链
var Foo = (function () {
  var x = 0;
  function Foo() {}
  Foo.prototype.increment = function () {
    ++x;
    console.log(x);
  };
  return Foo;
})();

var a = new Foo();
a.increment(); // 1
a.increment(); // 2
var b = new Foo();
b.increment(); // 3

// new 执行
var name = "Jay";
function Person(name) {
  this.name = name;
  console.log(this.name);
}
var a = Person("Tom"); // Tom，非严格模式默认绑定，指向 window，修改 window.name 为 Tom
console.log(name); // Tom
console.log(a); // undefined
var b = new Person("Michael"); // Michael new 绑定优先
console.log(b); // { name: "Michael" }

// 地址问题
var obj = { x: 1 };
var a = obj;
obj = { x: 2 };
console.log(a.x); // 1, obj 的地址赋值给 a，obj 重新指向了新地址 { x: 2}

// 地址加原型
var tmp = {};
var A = function () {};
A.prototype = tmp;
var a = new A();
A.prototype = {};
var b = Object.create(tmp);
console.log(a instanceof A); // false, a 的 __proto__ 仍然指向 temp，A 的原型对象被修改为新的 {}
console.log(b instanceof A); // b 的原型对象为 temp，A 的原型对象被修改为新的 {}

// delete
const Book = {
  price: 32,
};
const book = Object.create(Book);
book.type = "Math"; // book.__proto___ { type: "Math", prototype: { price: 32 } }
delete book.price; // 无效
delete book.type;
console.log(book.price); // 32
console.log(book.type); // undefiend
