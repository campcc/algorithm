/**
 * 链表数据结构，创建链表
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

// 通过数组方式创建链表
function createLinkedList(nums, n = nums.length) {
  if (n === 0) {
    return null;
  }

  var head = new ListNode(nums[0]);
  var cur = head;

  for (var i = 1; i < n; i++) {
    cur.next = new ListNode(nums[i]);
    cur = cur.next;
  }

  return head;
}

// 打印链表
function printLinkedList(head) {
  var cur = head;
  var res = [];

  while (cur !== null) {
    res.push(cur.val);
    cur = cur.next;
  }

  res.push(null);
  console.log(res);
}

module.exports = {
  ListNode,
  createLinkedList,
  printLinkedList,
};
