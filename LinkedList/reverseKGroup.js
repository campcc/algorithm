const { ListNode, createLinkedList, printLinkedList } = require("./ListNode");
/**
 * 给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。
 */

// 借助栈，把 k 个数压入栈中，依次出栈
// 1 → 2 → 3 → 4 → 5 → null
function reverseKGroup(head, k) {
  if (k < 2) {
    return head;
  }

  var dummy = new ListNode(),
    p = dummy,
    stack = [];

  while (true) {
    var cur = head;

    // 将前 k 个节点压入栈
    while (cur && stack.length < k) {
      stack.push(cur);
      cur = cur.next;
    }

    // 如果栈大小等于 k ，说明我们压入栈的节点可以进行反转
    // 如果栈大小小于 k ，此时我们只需要将 dummy.next 指向剩余元素返回即可
    if (stack.length < k) {
      p.next = head;
      break;
    }

    // 由于栈的特性，这里我们将栈中的节点依次出栈，连接到 dummy 节点后面，就可以完成本次循环的 k 个元素的反转
    while (stack.length) {
      p.next = stack.pop();
      p = p.next;
    }

    // 从第 k + 1 个节点开始，继续下一轮循环，寻找是否还存在 k 个节点可以反转
    p.next = cur;
    head = cur;
  }

  return dummy.next;
}

// 我们也可以不借助栈使用双指针完成节点反转
// 1 → 2 → 3 → 4 → 5 → null
function reverseKGroup(head, k) {
  if (k < 2) {
    return head;
  }

  var dummy = new ListNode();
  dummy.next = head;

  var pre = dummy;
  var tail = dummy;

  while (true) {
    var count = 0;

    // 尾指针先移动到第 k 个元素位置
    while (tail && count < k) {
      tail = tail.next;
      count++;
    }

    // 如果尾指针为空，说明已经不存在 k 个元素可以翻转了，我们跳出循环
    if (tail === null) {
      break;
    }

    // 保存下一次翻转的起始节点，下次循环应该从第 k + 1 个节点开始，也就是 pre.next
    var p = pre.next;

    // 头插法翻转
    while (pre.next !== tail) {
      var cur = pre.next;
      pre.next = cur.next;
      cur.next = tail.next;
      tail.next = cur;
    }

    // 从第 k + 1 个节点继续
    pre = p;
    tail = p;
  }

  return dummy.next;
}

// 变种1：从后往前 k 个一组反转
function reverseKGroup1(head, k) {}

// var list = [1, 2, 3, 4, 5];
// var head = createLinkedList(list);
// printLinkedList(reverseKGroup(head, 2));
