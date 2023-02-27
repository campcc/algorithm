const { createLinkedList, printLinkedList } = require("./ListNode");

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

var list = [1, 1, 2, 3, 3];
var head = createLinkedList(list);
printLinkedList(deleteDuplicates(head));
