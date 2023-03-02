/**
 * 给定单个链表的头 head ，使用 插入排序 对链表进行排序，并返回 排序后链表的头
 */

// 首先回顾一下插入排序
// 思路：从未排序区间中取出一个元素，遍历已排序区间找到合适的位置插入
// [3, 4, 2, 7, 1]
function insertionSort(nums) {
  var len = nums.length;

  for (var i = 1; i < len; i++) {
    // 把当前遍历到元素取出来，我们记为 value，然后从后往前遍历已排序区间 [0...i - 1], j = i - 1
    // 遍历的过程中，如果遍历到的元素比 value 大，说明 value 可以往前进行插入
    // 我们进行一次替换，将当前遍历到的元素替换到 value 的位置，直到找到一个值比 value 小的元素，该元素的索引为 j，接着我们将 value 插入到该元素的后面
    var value = nums[i],
      j = i - 1;

    while (j >= 0 && nums[j] > value) {
      nums[j + 1] = nums[j];
      j--;
    }

    // 找到插入位置后，插入当前元素
    nums[j + 1] = value;
  }

  return nums;
}

// 思路与插入排序类似，可以分为两步
// 1.先找到待插入的节点，删除该节点
// 2.从头遍历找到节点应该插入的位置
// -1 → 5 → 3 → 4 → null
// dummy     cur      cur.next
//  0   ->   -1    ->    5     ->     3     ->     4     ->    null

// prev
// dummy    prev.next
//   0   ->    -1    ->     5    ->    4     ->    0
// temp
//   3   ->   4   ->   0

function insertionSortList(head) {
  if (head === null) {
    return head;
  }

  var dummy = new ListNode();
  dummy.next = head;

  // 从第一个节点开始
  var cur = head;

  while (cur && cur.next) {
    var temp = null;

    // 首先找到待插入的节点，从头节点开始遍历，如果下一个节点值小于当前节点，说明下一个节点是可以往前插入的
    if (cur.val <= cur.next.val) {
      cur = cur.next;
    } else {
      // 此时 cur.next 就是我们需要往前插入的节点，我们将该节点删除并保存到 temp
      temp = cur.next;
      cur.next = cur.next.next;

      // 然后开始寻找插入位置，初始化一个新的指针寻找插入位置，从 dummy 节点开始遍历，找到一个值大于 temp 的位置，也就是 pre.next
      var pre = dummy;
      while (pre.next.val <= temp.val) {
        pre = pre.next;
      }

      // 然后将 temp 插入到 pre 和 pre.next 之间
      temp.next = pre.next;
      pre.next = temp;
    }
  }

  return dummy.next;
}
