const { ListNode, createLinkedList, printLinkedList } = require("./ListNode");

/**
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点
 */

// 最简单的思路是先求链表长度，找到倒数第 n 个位置删除
function removeNthFromEnd(head, n) {
  var p = head,
    length = 0;

  // 获取链表长度
  while (p) {
    p = p.next;
    length++;
  }

  var dummy = new ListNode();
  dummy.next = head;

  var cur = dummy,
    i = 0;
  // 倒数第 n 个节点就是第 length - n 个节点
  while (i < length - n && cur.next) {
    cur = cur.next;
    i++;
  }

  cur.next = cur.next.next;

  return dummy.next;
}

// 借助栈
function removeNthFromEnd(head, n) {
  var dummy = new ListNode();
  dummy.next = head;

  var stack = [],
    cur = dummy;

  // 遍历一遍将节点全部入栈
  while (cur) {
    stack.push(cur);
    cur = cur.next;
  }

  // 然后删除栈中的前 n 个节点
  for (var i = 0; i < n; i++) {
    stack.pop();
  }

  // 此时栈顶元素就是倒数第 n 个节点
  var pre = stack.pop();
  pre.next = pre.next.next;

  return dummy.next;
}

// 快慢指针
function removeNthFromEnd(head, n) {
  var dummy = new ListNode();
  dummy.next = head;

  var slow = dummy,
    fast = dummy.next;

  // 快指针先走 n 步
  for (var i = 0; i < n; i++) {
    fast = fast.next;
  }

  // 快指针到达链表尾部时，慢指针的位置就是倒数第 n 个节点
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }

  // 删除倒数第 n 个节点
  slow.next = slow.next.next;

  return dummy.next;
}

var list = [1, 2, 3, 4, 5];
var head = createLinkedList(list);
printLinkedList(removeNthFromEnd(head, 1));
