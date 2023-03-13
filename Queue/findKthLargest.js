/**
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素
 */

// 排序后查找
function findKthLargest(nums, k) {
  nums.sort((a, b) => a - b);
  return nums[k - 1];
}

// 优先级队列，最小堆
function findKthLargest(nums, k) {
  nums.unshift(null);

  var n = nums.length;

  // 构建最大堆
  // 堆顶元素为最大元素，删除堆顶元素后为第二大，再次删除堆顶后为第三大...以此类推，第 k 大元素我们需要删除堆顶元素 k - 1 次
  var heap = buildHeap(nums, n);

  for (var i = 1; i < k; i++) {
    removeTop(heap);
  }

  return heap[1];
}

function buildHeap(a, n) {
  for (var i = Math.floor(n / 2); i >= 1; i--) {
    heapify(a, n, i);
  }

  return a;
}

function heapify(a, n, i) {
  while (true) {
    var maxPos = i;

    if (i * 2 <= n && a[maxPos] < a[i * 2]) maxPos = i * 2;
    if (i * 2 + 1 <= n && a[maxPos] < a[i * 2 + 1]) maxPos = i * 2 + 1;

    if (maxPos === i) break;

    swap(a, i, maxPos);

    i = maxPos;
  }
}

function removeTop(heap) {
  var n = heap.length;

  swap(heap, 1, n - 1);

  heap.pop();

  heapify(heap, n - 1, 1);
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));
