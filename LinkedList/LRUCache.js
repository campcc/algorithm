/**
 * 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
 * 实现 LRUCache 类：
 * LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
 * int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
 * void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
 * 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
 */

// 思路：双向链表 + 哈希
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.map = new Map();
  this.dummyHead = new ListNode();
  this.dummyTail = new ListNode();
  this.dummyHead.next = this.dummyTail;
  this.dummyTail.prev = this.dummyHead;
  this.count = 0;

  this.moveToHead = function (node) {
    this.removeNode(node);
    this.addToHead(node);
  };

  this.removeNode = function (node) {
    var prev = node.prev,
      next = node.next;
    prev.next = next;
    next.prev = prev;
  };

  this.addToHead = function (node) {
    node.prev = this.dummyHead;
    node.next = this.dummyHead.next;
    this.dummyHead.next.prev = node;
    this.dummyHead.next = node;
  };

  this.removeLast = function () {
    var tail = this.popTail();
    this.map.delete(tail.key);
    this.count--;
  };

  this.popTail = function () {
    var tail = this.dummyTail.prev;
    this.removeNode(tail);
    return tail;
  };
};

LRUCache.prototype.get = function (key) {
  var node = this.map.get(key);
  if (node) {
    this.moveToHead(node);
    return node;
  } else {
    return -1;
  }
};

LRUCache.prototype.put = function (key, value) {
  var node = this.map.get(key);
  if (node) {
    node.value = value;
    this.moveToHead(node);
  } else {
    // 新数据，容量满了，删除链表最后一个节点
    if (this.count === this.capacity) {
      this.removeLast();
    }

    var newNode = new ListNode(key, value);
    this.map.set(key, newNode);
    this.count++;
  }
};
