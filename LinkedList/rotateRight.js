const { ListNode, createLinkedList, printLinkedList } = require("./ListNode");

/**
 * 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置
 */

// 闭合为环
// 思路：每 n 次移动都会让链表变回原状，右移动次数 k >=n 时，需要向右移动 k mod n 次
// 可以考虑将链表头尾节点相连闭合为环，找到下一个新链表的尾节点然后断开
// 假设索引从 0 开始，新链表的尾节点就是原链表的第 (n - 1) - (k mod n)
function rotateRight(head, k) {
  // 特别的，链表长度不大于 1 或者为 k 为 n 的整数倍时，移动后还是原链表
  if (head === null || head.next === null) {
    return head;
  }

  // 求链表长度，我们后续需要用到尾节点，这里从 1 开始计数只遍历到尾节点
  var n = 1,
    p = head;

  while (p.next) {
    p = p.next;
    n++;
  }

  if (k % n === 0) {
    return head;
  }

  // 将链表头尾相连闭合为环
  p.next = head;

  // 找到新链表最后一个节点的位置
  var i = n - 1 - (k % n);
  while (i >= 0) {
    p = p.next;
    i--;
  }

  // 缓存新链表的头节点
  var newHead = p.next;

  // 把新链表的尾节点断开
  p.next = null;
  return newHead;
}

// 双指针
// 思路：遍历链表求出长度 n，找到尾节点 tail，
// 再次遍历链表，找到第 n - 1 - (k mod n) 个节点，也就是新链表头节点的前一个节点，记为 p
// 将 tail 指向 head，head 从 p.next 开始，p.next 置空完成拼接，返回头节点
function rotateRight(head, k) {
  if (head === null || head.next === null) {
    return head;
  }

  var tail = null,
    n = 0,
    p = head;

  // 求链表长度和尾节点
  while (p) {
    tail = p;
    p = p.next;
    n++;
  }

  if (k % n === 0) {
    return head;
  }

  var i = 0,
    pre = head;

  // 找到新链表头节点的前一个节点
  while (i < n - 1 - (k % n)) {
    pre = pre.next;
    i++;
  }

  // 拼接
  tail.next = head;
  head = pre.next;
  pre.next = null;

  return head;
}

var list = [1, 2, 3, 4, 5];
var head = createLinkedList(list);
printLinkedList(rotateRight(head, 1));
