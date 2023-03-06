const { ListNode, createLinkedList, printLinkedList } = require("./ListNode");
/**
 * 给定一个单链表 L 的头节点 head ，单链表 L 表示为：
 * L0 → L1 → … → Ln - 1 → Ln
 * 请将其重新排列后变为：
 * L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
 * 不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换
 */

// 链表不支持下标访问，数组可以，考虑用数组存储链表，
// 然后使用头尾指针重建链表
function reorderList(head) {
  if (head === null) {
    return head;
  }

  var list = [],
    p = head;

  while (p) {
    list.push(p);
    p = p.next;
  }

  var i = 0,
    j = list.length - 1,
    dummy = new ListNode();

  dummy.next = list[i];

  while (i < j) {
    list[i].next = list[j];
    i++;
    list[j].next = list[i];
    j--;
  }

  list[i].next = null;

  return dummy.next;
}

// 找到链表中点，将链表切断成两个链表，将第二个链表逆序，依次连接两个链表
function reorderList(head) {
  var slow = head,
    fast = head.next;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  var cur = slow.next;
  slow.next = null;

  cur = reverseList(cur);

  var dummy = new ListNode();
  dummy.next = head;

  while (head && cur) {
    var temp1 = head.next;
    var temp2 = cur.next;

    head.next = cur;
    head = temp1;

    cur.next = head;
    cur = temp2;
  }

  return dummy.next;
}

function reverseList(head) {
  if (head === null) {
    return head;
  }

  var pre = null;
  var cur = head;

  while (cur) {
    var next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }

  return pre;
}

var list = [1, 2, 3, 4, 5, 6];
var head = createLinkedList(list);
reorderList(head);
// printLinkedList(reorderList(head));
