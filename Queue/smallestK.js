/**
 * 设计一个算法，找出数组中最小的k个数。以任意顺序返回这k个数均可
 */

// 排序后返回
function smallestK(arr, k) {
  arr.sort((a, b) => a - b);
  return arr.slice(0, k);
}

// 维护最大堆
function smallestK(arr, k) {
  if (k === 0) {
    return [];
  }

  arr.unshift(null);

  var heap = buildHeap(arr, k);

  for (var i = k + 1; i < arr.length; i++) {
    if (arr[i] < heap[1]) {
      swap(heap, i, 1);
      heapify(heap, k, 1);
    }
  }

  return heap.slice(1, k + 1);
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

    if (2 * i <= n && a[maxPos] < a[2 * i]) maxPos = 2 * i;
    if (2 * i + 1 <= n && a[maxPos] < a[2 * i + 1]) maxPos = 2 * i + 1;

    if (maxPos === i) break;

    swap(a, i, maxPos);

    i = maxPos;
  }
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
