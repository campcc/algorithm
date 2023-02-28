/**
 * 给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点
 */

function removeElements(head, val) {
  // 如果需要删除的刚好是头节点
  while (head && head.val === val) {
    head = head.next;
  }

  // 删除完后头节点已经为 null
  if (head === null) {
    return head;
  }

  var cur = head;
  // 遍历依次删除除头节点的外的其他节点
  while (cur.next) {
    if (cur.next.val === val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }

  return head;
}

function removeElements1(head, val) {
  var dummy = new ListNode();
  dummy.next = head;

  var cur = dummy;

  while (cur.next) {
    if (cur.next.val === val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }

  return dummy.next;
}
