// 类型

// 7 个基本类型，1 个引用类型
// 基本类型：String、Number、Boolean、Symbol、Undefined、Null、Bigint
// 引用类型：Object

// typeof
// 1. null 返回 object，函数返回 function，引用类型除了 function 全部返回 object
// 2. bigint 返回 bigint，regexp 返回 object

// instanceof
// 1. 原理：判断对象的原型链中是否可以找到类型的 prototype
// 2. 调用需要右侧是对象，所以无法判断 null、undefined

// 内存泄漏
// 1. 全局变量
// 2. 没有清理掉 DOM 元素的引用
// 3. 事件监听没有移除
// 4. 定时器没有移除

var refA = document.getElementById("test");
document.body.removeChild(refA); // dom删除了
console.log(refA, "refA"); // 但是还存在引用，能 console 出整个 div，没有被回收
refA = null; // 解除引用
console.log(refA, "refA");

// 事件
// 1. 不支持冒泡的鼠标事件 mouseleave
// 2. A 元素拖拽并放置到 B，B 元素需要 event.preventDefaul()，才能够接收 drop 事件

// Promise
// 1. Promise.all，resolve 条件为传入空数组或者所有的 promise 都变成完成状态；reject 条件为其中一个失败
// 2. Promise.race
// 3. push、splice 会改变原数组，slice、concat、map 会返回一个新数组不会改变原数组

// JS 基础
// 1. sort 方法默认将元素转为字符串，然后按 UTF-16 编码排序
// 2. parseInt 返回某进制（默认十进制）的整数，parseFloat 尝试返回一个浮点数
// 3. 非全等比较，如果其中一个操作数为 null 或 undefined，另一个也必须为 null 或 undefined；对象与基础类型比较，会先按顺序调用 valueOf 和 toString
// 4. Infinity + 1 还是 Infinity，相等，完全相等都成立
