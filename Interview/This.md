**绑定规则**

4 种绑定，

1. 默认绑定，严格模式下绑定到 undefined、非严格模式下指向全局对象（window、globalThis）
2. 隐式绑定，如果函数在调用位置有上下文对象，this 会隐式绑定到这个对象
3. 显示绑定，使用 call、apply、bind 直接指定 this
4. new 绑定，new 的实现原理里，会创建一个连接到构造函数原型的对象，实例化时 this 绑定到这个对象
5. 箭头函数的 this，根据最外层的词法作用域来确定 this，具体来说 this 会绑定到外层第一个不是箭头函数的 this

优先级，

new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定

隐式绑定 this 丢失，

1. 使用函数别名调用

```js
var value = 1;

function foo() {
  console.log(this.value);
}

var obj = {
  value: 2,
  foo: foo,
};

var bar = obj.foo;

// 使用函数别名调用时，bar 实际上引用的还是 foo 函数本身，调用位置没有在 obj 对象上下文内，这种情况下隐式绑定不会生效
bar();
```

2. 函数作为参数传递

```js
var value = 1;

function foo() {
  console.log(this.value);
}

function bar(fn) {
  fn();
}

var obj = {
  value: 2,
  foo: foo,
};

// 函数作为参数传递，本质上是值引用，传递的仍是一个引用的地址，所以这里 bar 引用的还是 foo 函数本身，调用位置没有在 obj 对象上下文内
bar(obj.foo);
```
