// JavaScript 继承，寄生组合继承
function SuperType(name) {
  this.name = name;
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

SubType.prototype = Object.create(SuperType.prototype);
SubType.prototype.constructor = SubType;

// 简单抽离一下就是
function inherit(subType, superType) {
  var prototype = Object.create(superType);
  prototype.constructor = subType;
  subType.prototype = prototype;
}

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

inherit(SubType, SuperType);

// 混入继承多个
function OtherSuperType() {}

function SubType() {
  SubType.call(this);
  OtherSuperType.call(this);
}

SubType.prototype = Object.create(SuperType.prototype);
Object.assign(SubType.prototype, OtherSuperType.prototype);
SubType.prototype.constructor = SubType;

// es6 extends 关键字原理
// 与寄生组合类似
function _extends(subType, superType) {
  subType.prototype = Object.create(superType.prototype, {
    constructor: {
      value: subType,
      enumerable: false,
      writable: false,
      configurable: true,
    },
  });

  if (superType) {
    Object.setPrototypeOf ? Object.setPrototypeOf(subType, superType) : (subType.__proto__ = superType);
  }
}
