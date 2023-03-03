const { ListNode, createLinkedList, printLinkedList } = require("./ListNode");
/**
 * 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表
 */

// 方式1：转换成数组进行排序
function sortList(head) {
  var list = [];

  while (head) {
    list.push(head.val);
    head = head.next;
  }

  list.sort((a, b) => a - b);

  var dummy = new ListNode();
  var cur = dummy;
  for (var value of list) {
    cur.next = new ListNode(value);
    cur = cur.next;
  }

  return dummy.next;
}

// 方式2：归并思路
// 1. 首先找到链表中点，可以通过快慢指针的方式，找到中点 mid 后，执行 mid.next = null 将链表切断
// 2. 然后对两个子链表进行排序
// 3. 合并两个有序子链表
function sortList(head) {
  if (head === null || head.next === null) {
    return head;
  }

  // 快慢指针寻找链表中点，这里需要考虑链表节点为偶数的情况，偶数时，我们要找的应该是左边的中点，所以 fast 初始值应该为 head.next
  var fast = head.next,
    slow = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 找到中点后，我们需要将链表切分为 [head...mid], [mid...null]，所以这里需要执行 mid.next = null 将链表切断
  // 切断前我们先保留 mid.next，这样子链表就变成了 [head...mid], [mid.next...null]
  var temp = slow.next;
  slow.next = null;

  // 一直切分，直到满足递归终止条件
  var l = sortList(head);
  var r = sortList(temp);

  // 将切分好的有序子链表两两合并
  var dummy = new ListNode();
  var cur = dummy;
  while (l && r) {
    if (l.val < r.val) {
      cur.next = l;
      l = l.next;
    } else {
      cur.next = r;
      r = r.next;
    }
    cur = cur.next;
  }

  cur.next = l ? l : r;

  return dummy.next;
}

// 方式3：自底向上的归并
// 思路：将链表拆分为长度 subLength 为 1 的子链表，然后将子链表两两合并，
// 合并后将 subLength 值增大两倍，继续拆分合并直到子链表长度大于等于链表的长度
function sortList(head) {
  if (head === null) {
    return head;
  }

  // 先求链表长度
  var length = 0,
    p = head;

  while (p) {
    length++;
    p = p.next;
  }

  var dummy = new ListNode();
  dummy.next = head;

  // 从长度为 1 的子链表开始，向上归并
  var subLength = 1;

  while (subLength < length) {
    var pre = dummy,
      cur = dummy.next;

    while (cur) {
      // 将链表切分长度为 subLength 的子链表
      // 先从头节点开始，截取长度为 subLength 的子链表，记为 l
      var l = cur;
      for (var i = 1; i < subLength && cur.next; i++) {
        cur = cur.next;
      }

      // 从子链表 l 处切断
      var r = cur.next;
      cur.next = null;

      // 从 l 的下一个节点开始，继续截取 subLength 的子链表，记为 r
      cur = r;
      for (var i = 1; i < subLength && cur && cur.next; i++) {
        cur = cur.next;
      }

      // 如果截取后链表节点还剩余，切断链表，保留切断的节点，等子链表合并完成后连接到后面
      var temp = null;
      if (cur) {
        temp = cur.next;
        cur.next = null;
      }

      // 合并子链表，合并结果连接到 dummy 节点后面
      var merged = merge(l, r);
      pre.next = merged;

      // 遍历到合并后的最后一个节点，将刚才切断后剩余的链表连接
      while (pre.next) {
        pre = pre.next;
      }
      cur = temp;
    }

    subLength *= 2;
  }

  return dummy.next;
}

function merge(l1, l2) {
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

  p.next = l1 ? l1 : l2;

  return dummy.next;
}

var list = [4, 2, 1, 3];
var head = createLinkedList(list);
printLinkedList(sortList(head));
