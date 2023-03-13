/**
 * 给你一个链表数组，每个链表都已经按升序排列
 * 请你将所有链表合并到一个升序链表中，返回合并后的链表
 */

function mergeKLists(lists) {
  var head = null;

  for (var i = 0; i < lists.length; i++) {
    head = merge(head, lists[i]);
  }

  return head;
}

function merge(l1, l2) {
  var dummy = new ListNode();
  var p = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      p.next = l1;
      l1 = l1.next;
    } else {
      p.next = l2;
      l2 = l2.next;
    }
    p = p.next;
  }

  p.next = l1 ? l1 : l2;

  return dummy.next;
}
