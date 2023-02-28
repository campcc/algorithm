/**
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 */

// 遍历 l1, l2 合并较小的值到结果链表，遍历结束后，将 l1, l2 中剩余部分合并到末尾
function mergeTwoLists(l1, l2) {
  var dummy = new ListNode();
  var p = dummy;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      p.next = l1;
      l1 = l1.next;
    } else {
      p.next = l2;
      l2 = l2.next;
    }
    p = p.next;
  }

  if (l1) p.next = l1;
  if (l2) p.next = l2;

  return dummy.next;
}

// 递归，递归函数定义为，两个链表头部值较小的一个节点与剩下元素的 merge 操作结果合并
function mergeTwoLists2(l1, l2) {
  if (l1 === null) return l2;
  if (l2 === null) return l1;

  if (l1.val < l2.val) {
    l1.next = mergeTwoLists2(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists2(l1, l2.next);
    return l2;
  }
}
