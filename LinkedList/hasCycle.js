/**
 * 给你一个链表的头节点 head ，判断链表中是否有环
 */

// 哈希表
function hasCycle(head) {
  var set = new Set();

  while (head) {
    if (set.has(head)) {
      return true;
    }
    set.add(head);
    head = head.next;
  }

  return false;
}

// 快慢指针
function hasCycle(head) {
  if (head === null || head.next === null) {
    return false;
  }

  var slow = head,
    fast = head.next;

  while (slow !== fast) {
    if (fast === null || fast.next === null) {
      return false;
    }
    slow = slow.next;
    fast = fast.next.next;
  }

  return true;
}
