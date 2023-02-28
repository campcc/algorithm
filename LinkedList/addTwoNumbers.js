const { ListNode, createLinkedList, printLinkedList } = require("./ListNode");

/**
 * 给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字
 * 请你将两个数相加，并以相同形式返回一个表示和的链表
 * l1 = [2,4,3], l2 = [5,6,4] // [7,0,8]
 */

// 逆序链表求和，我们可以直接对同一位置的数字相加
// 这里每次相加以及相加完后都需要考虑的进位的情况
function addTwoNumbers(l1, l2) {
  var dummy = new ListNode(),
    p = dummy;

  var carry = 0;

  while (l1 || l2) {
    var x = l1 ? l1.val : 0;
    var y = l2 ? l2.val : 0;
    var sum = x + y + carry;

    carry = Math.floor(sum / 10);
    sum = sum % 10;

    p.next = new ListNode(sum);
    p = p.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  if (carry > 0) {
    p.next = new ListNode(carry);
  }

  return dummy.next;
}

// var l1 = createLinkedList([9, 9, 9, 9, 9, 9, 9]);
// var l2 = createLinkedList([9, 9, 9, 9]);
// printLinkedList(addTwoNumbers(l1, l2));

// 变种1：链表不是逆序的
// 这里我们可以考虑将链表先反转，然后再求和
// 需要注意的是，由于我们是反转链表 l1, l2 后求和，最终的结果链表也需要反转
function addTwoNumbers1(l1, l2) {
  l1 = reverseList(l1);
  l2 = reverseList(l2);

  var dummy = new ListNode();
  var p = dummy;
  var carry = 0;

  while (l1 || l2) {
    var x = l1 ? l1.val : 0;
    var y = l2 ? l2.val : 0;
    var sum = x + y + carry;

    carry = Math.floor(sum / 10);
    sum = sum % 10;

    p.next = new ListNode(sum);
    p = p.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  if (carry > 0) {
    p.next = new ListNode(carry);
  }

  return reverseList(dummy.next);
}

// 这里也可以借助栈的特性，先将数字依次压入栈，再依次取出相加
function addTwoNumbers2(l1, l2) {
  var s1 = [];
  var s2 = [];

  while (l1) {
    s1.push(l1.val);
    l1 = l1.next;
  }

  while (l2) {
    s2.push(l2.val);
    l2 = l2.next;
  }

  var carry = 0,
    head = null;

  while (s1.length || s2.length) {
    var x = s1.length ? s1.pop() : 0;
    var y = s2.length ? s2.pop() : 0;
    var sum = x + y + carry;

    carry = Math.floor(sum / 10);
    sum = sum % 10;

    var cur = new ListNode(sum);
    cur.next = head;
    head = cur;
  }

  if (carry > 0) {
    var cur = new ListNode(carry);
    cur.next = head;
    head = cur;
  }

  return head;
}

// 巧用 BigInt
function addTwoNumbers3(l1, l2) {
  var x = "",
    y = "";

  while (l1) {
    x += l1.val;
    l1 = l1.next;
  }

  while (l2) {
    y += l2.val;
    l2 = l2.next;
  }

  var sum = BigInt(x) + BigInt(y) + "";

  var p = new ListNode(),
    dummy = p;
  for (var char of sum) {
    p.next = new ListNode(char);
    p = p.next;
  }

  return dummy.next;
}

function reverseList(head) {
  var pre = null;
  var cur = head;

  while (cur !== null) {
    var next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }

  return pre;
}
