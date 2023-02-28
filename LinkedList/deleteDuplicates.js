const { createLinkedList, printLinkedList, ListNode } = require("./ListNode");

/**
 * 给定一个已排序的链表的头 head，删除所有重复的元素，使每个元素只出现一次，返回已排序的链表
 */

// 利用链表有序的特性，遍历一次链表，将重复的 cur.next 删除
function deleteDuplicates(head) {
  var cur = head;

  while (cur !== null && cur.next !== null) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return head;
}

// 变种1：删除原始链表中所有重复数字的节点，只留下不同的数字
function deleteDuplicates1(head) {
  var dummy = new ListNode();
  dummy.next = head;

  var cur = dummy;

  while (cur.next && cur.next.next) {
    // 如果相邻元素值相等，删除相邻元素
    if (cur.next.val === cur.next.next.val) {
      var x = cur.next.val;
      while (cur.next && cur.next.val === x) {
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }

  return dummy.next;
}

// 变种1：如果链表不是有序的，删除原始链表中所有重复数字的节点，只留下不同的数字
// 我们可以考虑两次，遍历，第一次遍历用哈希表计数统计频率，第二次遍历删除频率 > 1 节点
function deleteDuplicates2(head) {
  var map = new Map();

  var dummy = new ListNode();
  dummy.next = head;

  var p = head;

  while (p) {
    map.set(p.val, (map.get(p.val) || 0) + 1);
    p = p.next;
  }

  var cur = dummy;

  while (cur.next) {
    if (map.get(cur.next.val) > 1) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }

  return dummy.next;
}

// var list = [1, 1, 2, 3, 3];
// var head = createLinkedList(list);
// printLinkedList(deleteDuplicates(head));
