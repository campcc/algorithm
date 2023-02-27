const { ListNode, createLinkedList, printLinkedList } = require("./ListNode");

/**
 * 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right
 * 请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表
 * head = [1,2,3,4,5], left = 2, right = 4 // [1,4,3,2,5]
 */

// 与反转整个链表类似，这里给定了区间，我们可以先将 pre, cur 移动到区间对应位置，cur 指向第一个要反转的节点
// 接着使用头插法，将 cur 的下一个元素删除，插入到 pre 的后面，依次完成反转
function reverseBetween(head, left, right) {
  // 为什么要使用 dummy 虚拟头节点？
  // 如果要翻转的区间包含了原始链表的第一个位置，使用 dummy 可以保持逻辑不变，不用特殊处理头节点
  var dummy = new ListNode();
  dummy.next = head;

  var pre = dummy;
  var cur = head;

  for (var i = 0; i < left - 1; i++) {
    pre = pre.next;
    cur = cur.next;
  }

  for (var i = 0; i < right - left; i++) {
    var next = cur.next;
    cur.next = cur.next.next;
    next.next = pre.next;
    pre.next = next;
  }

  return dummy.next;
}

var list = [1, 2, 3, 4, 5];
var head = createLinkedList(list);
printLinkedList(reverseBetween(head, 2, 4));
