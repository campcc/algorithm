const { ListNode, createLinkedList, printLinkedList } = require("./ListNode");

/**
 * 给你一个链表的头节点 head 和一个特定值 x，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前
 * 你应当 保留 两个分区中每个节点的初始相对位置
 */

// 用额外的两个链表辅助存储，最后拼接
function partition(head, x) {
  var small = new ListNode(),
    large = new ListNode();

  var dummySmall = small,
    dummyLarge = large;

  while (head !== null) {
    if (head.val < x) {
      small.next = head;
      small = small.next;
    } else {
      large.next = head;
      large = large.next;
    }
    head = head.next;
  }

  small.next = dummyLarge.next;
  large.next = null;

  return dummySmall.next;
}

var list = [1, 4, 3, 2, 5, 2];
var head = createLinkedList(list);
printLinkedList(partition(head, 3));
