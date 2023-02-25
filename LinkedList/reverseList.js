/**
 * 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 */

// 考虑一个元素较少的链表，1 -> 2 -> 3 -> ∅
// 我们只需要遍历链表，依次将当前的元素和下一个元素进行交换就可以完成整个链表的翻转
// 我们考虑第一个元素，此时：prev = null, cur = 1, next = 2，我们只需要令
// next = prev, prev = cur, cur = next 即可完成 1，2 的翻转
// 这里要注意的是，我们让 next 指向 prev 前，需要存储 next 指针，否则最后的 cur 指针就没办法指向原来的 next 了
function reverseList1(head) {
  var pre = null;
  var cur = head;

  while (cur !== null) {
    // 存储 next
    var next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }

  return pre;
}

// 也可以考虑递归的实现，
// 先一条路走到底，递归到最后一个节点
// 此后，每次函数在返回的时候，将当前节点的下一个节点指向当前节点
// 需要注意的是，返回过程中，当前节点的下一个节点需要置空，否则链表中可能产生环
function reverseList(head) {
  if (head === null || head.next === null) {
    return head;
  }

  // 先递归到最后一个节点，准备开始反转
  var cur = reverseList(head.next);

  head.next.next = head;

  // 置空刚刚反转后的 cur，防止链表产生环
  head.next = null;

  return cur;
}
