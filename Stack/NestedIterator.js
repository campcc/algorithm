/**
 * 给你一个嵌套的整数列表 nestedList 。每个元素要么是一个整数，要么是一个列表；
 * 该列表的元素也可能是整数或者是其他列表。请你实现一个迭代器将其扁平化，使之能够遍历这个列表中的所有整数。
 * nestedList = [[1,1],2,[1,1]] // [1,1,2,1,1]
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
 */

function NestedIterator(nestedList) {
  this.stack = nestedList;
}

NestedIterator.prototype.hasNext = function () {
  while (this.stack.length) {
    if (this.stack[0].isInteger()) {
      return true;
    }
    var cur = this.stack[0].getList();
    this.stack.shift();
    this.stack.unshift(...cur);
  }
};

NestedIterator.prototype.next = function () {
  return this.stack.shift().getInteger();
};
