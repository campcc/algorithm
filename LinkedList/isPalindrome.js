const { ListNode, createLinkedList, printLinkedList } = require("./ListNode");
/**
 * 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。
 * 如果是，返回 true ；否则，返回 false
 */

// 借助数组，再用双指针遍历
function isPalindrome(head) {
  if (head === null || head.next === null) {
    return true;
  }

  var list = [],
    p = head;

  while (p) {
    list.push(p.val);
    p = p.next;
  }

  var i = 0,
    j = list.length - 1;

  while (i < j) {
    if (list[i] === list[j]) {
      i++;
      j--;
    } else {
      return false;
    }
  }

  return true;
}

// 递归
var front;

function isPalindrome(head) {
  front = head;
  return check(head, front);
}

function check(head) {
  if (head) {
    if (!check(head.next)) {
      return false;
    }

    if (head.val !== front.val) {
      return false;
    }

    front = front.next;
  }
  return true;
}

// 快慢指针
// 先把链表切分为两段，反转后半段，同时遍历前后两段链表，比较节点值
function isPalindrome(head) {
  var slow = head,
    fast = head.next;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  var temp = slow.next;
  slow.next = null;

  temp = reverseList(temp);

  while (head && temp) {
    if (head.val !== temp.val) {
      return false;
    }
    head = head.next;
    temp = temp.next;
  }

  return true;
}

function reverseList(head) {
  if (head === null) {
    return head;
  }

  var pre = null,
    cur = head;

  while (cur) {
    var next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }

  return pre;
}

var list = [1, 2, 4, 3, 2, 1];
var head = createLinkedList(list);
console.log(isPalindrome(head));
