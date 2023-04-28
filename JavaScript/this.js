// this 指向问题

// 1. 默认绑定，非严格模式下 this 指向全局对象，严格模式下 this 绑定为 undefined
// 2. 隐式绑定，满足 obj.f() 格式，this 会绑定到 obj，如果存在链式调用，this 永远指向最后调用它的那个对象
// 3. 隐式绑定丢失，foo = obj.f, foo()，作为函数别名调用或参数传递时会导致隐式绑定丢失，原理很简单，引用类型地址指针存放在栈，真正的本体存放在堆，函数别名赋值后，foo 的执行与 obj 没有任何关系
// 4. 显示绑定，通过 call、apply、bind 改变 this 指向
// 5. new 绑定，new 会调用构造函数生成一个新对象，this 会绑定到这个实例对象
// 6. 箭头函数绑定，通过作用域链查找到最外层非箭头函数的 this，箭头函数指向的时定义时的 this 而非执行时

var x = 1;
var obj = {
  x: 3,
  fun: function () {
    var x = 5;
    return this.x;
  },
};

var fun = obj.fun;
obj.fun(); // 3
fun(); // 1

var person = {
  age: 18,
  getAge: function () {
    return this.age;
  },
};
var getAge = person.getAge;
console.log(getAge()); // undefined

var obj = {
  name: "zhangsan",
  sayName: function () {
    console.log(this.name);
  },
};

var wfunc = obj.sayName;
obj.sayName(); // zhangsan
wfunc(); // undefined
var name = "lisi";
obj.sayName(); // zhangsan
wfunc(); // lisi

var a = 5;
function test() {
  a = 0;
  console.log(a);
  console.log(this.a);
  var a;
  console.log(a);
}
new test(); // 0 undefiend 0

function fun() {
  return () => {
    return () => {
      return () => {
        console.log(this.name);
      };
    };
  };
}
var f = fun.call({ name: "foo" }); // 一旦绑定后，不能通过 call\apply\bind 修改
var t1 = f.call({ name: "bar" })()(); // foo
var t2 = f().call({ name: "baz" })(); // foo
var t3 = f()().call({ name: "qux" }); // foo

let obj1 = {
  a: 1,
  foo: () => {
    console.log(this.a);
  },
};
console.log(obj1.foo()); // undefined 对象无法提供箭头函数作用域
const obj2 = obj1.foo; // 隐式绑定丢失
console.log(obj2()); // undefined

var name = "global";
var obj = {
  name: "local",
  foo: function () {
    this.name = "foo";
    console.log(this.name); // foo new 绑定到实例对象，bind 失效
  }.bind(window),
};
var bar = new obj.foo();
setTimeout(function () {
  console.log(window.name); // global
}, 0);
console.log(bar.name); // foo 实例的 name

var bar3 = (bar2 = bar);
bar2.name = "foo2"; // 地址指针赋值，修改地址指向堆内存的值
console.log(bar3.name); // foo2

var name = "global";
var obj = {
  name: "local",
  foo: function () {
    this.name = "foo";
    console.log(this.name);
  }.bind(window),
};
obj.foo(); // foo bind 绑定 window，大于隐式绑定 window 的 name 被修改为 foo
setTimeout(function () {
  console.log(this.name); // foo
}, 0);
console.log(name); // foo

var name = "global";
var obj = {
  name: "local",
  foo: function () {
    this.name = "foo";
    console.log(this.name);
  },
};
obj.foo.call(window); // foo 显示绑定到 window，window.name 被修改为 foo
var bar = new obj.foo(); // foo this 绑定到构造函数的实例对象
setTimeout(function () {
  console.log(window.name); // foo
}, 0);
console.log(bar.name); // foo 实例对象的属性

var bar3 = (bar2 = bar); // 地址赋值
bar2.name = "foo2"; // 修改同一个地址
console.log(bar3.name); // foo2
