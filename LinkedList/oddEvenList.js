const { ListNode, createLinkedList, printLinkedList } = require("./ListNode");

/**
 * 给定单链表的头节点 head ，将所有索引为奇数的节点和索引为偶数的节点分别组合在一起，然后返回重新排序的列表。
 * 第一个节点的索引被认为是奇数，第二个节点的索引为偶数，以此类推。
 * [1, 2, 3, 4, 5] // [1, 3, 5, 2, 4]
 */

// 额外的两个链表辅助存储，最后拼接
function oddEvenList(head) {
  var odd = new ListNode(),
    even = new ListNode();

  var dummyOdd = odd,
    dummyEven = even;

  var isOdd = true;
  while (head !== null) {
    if (isOdd) {
      odd.next = head;
      odd = odd.next;
    } else {
      even.next = head;
      even = even.next;
    }
    head = head.next;
    isOdd = !isOdd;
  }

  odd.next = dummyEven.next;
  even.next = null;

  return dummyOdd.next;
}

// 也可以使用多个指针来降低空间复杂度
// 奇数节点的下下个节点一定是奇数节点，偶数节点的下下个节点也一定是偶数节点，
// 我们可以考虑在原链表上维护两个指针，odd 和 even，遍历的同时应用上述关系保存奇偶链表值，最后合并
function oddEvenList2(head) {
  if (head === null) {
    return null;
  }

  var odd = head;
  var even = head.next;

  var dummy = new ListNode();
  dummy.next = even;

  while (odd.next && even.next) {
    odd.next = odd.next.next;
    even.next = even.next.next;
    odd = odd.next;
    even = even.next;
  }

  odd.next = dummy.next;

  return head;
}

var list = [1, 2, 3, 4, 5];
var head = createLinkedList(list);
printLinkedList(oddEvenList2(head));
