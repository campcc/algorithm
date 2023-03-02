/**
 * 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点
 * 你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）
 */

// 四指针，dummy → 1 → 2 → 3 → 4 → null
function swapPairs(head) {
  var dummy = new ListNode();
  dummy.next = head;

  var p = dummy;

  while (p.next && p.next.next) {
    var node1 = p.next;
    var node2 = p.next;
    var next = p.next.next.next;

    node2.next = node1;
    node1.next = next;
    p.next = node2;

    p = node1;
  }

  return dummy.next;
}

// 递归，我们考虑最小的递归单元
// 返回值：交换完成后的子链表
// 递归单元：设需要交换的两个点为 head 和 next，交换完成后，head 连接后面的子链表，next 连接 head
// 终止条件：head || head.next 为 null
function swapPairs2(head) {
  if (head === null || head.next === null) {
    return head;
  }

  var next = head.next;
  head.next = swapPairs2(next.next);
  next.next = head;

  return next;
}
