/**
 * 给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素
 */

// 我们可以先考虑经典的 topK 问题，如何在包含 n 个数据的数组中，查找前 K 大的数据
// 这里我们可以考虑维护一个大小为 k 的最小堆，然后从第 k + 1 个元素开始，与堆顶元素进行比较
// 如果大于堆顶元素，我们将堆顶元素与当前元素交换，然后向下堆化，直到剩余的 [k + 1...n] 元素全部完成堆化
function findTopK(nums, k) {
  nums.unshift(null);

  var n = nums.length;

  var minHeap = buildMinHeap(nums, k);

  for (var i = k + 1; i < n; i++) {
    if (nums[i] > minHeap[1]) {
      swap(minHeap, 1, i);
      heapify(minHeap, k, 1);
    }
  }

  return minHeap.slice(1, k + 1);
}

function buildMinHeap(a, n) {
  for (var i = Math.floor(n / 2); i >= 1; i--) {
    heapify(a, n, i);
  }

  return a;
}

function heapify(a, n, i) {
  while (true) {
    var minPos = i;

    if (2 * i <= n && a[minPos] > a[2 * i]) minPos = 2 * i;
    if (2 * i + 1 <= n && a[minPos] > a[2 * i + 1]) minPos = 2 * i + 1;

    if (minPos === i) break;

    swap(a, i, minPos);

    i = minPos;
  }
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

// console.log(findTopK([1, 2, 3, 4, 5, 6, 7, 10, 20, 30], 4));

// 借助哈希表，我们可以将前 K 个高频元素转化为，出现次数前 k 大的值对应的元素
function topKFrequent(nums, k) {
  function heapify(a, n, i) {
    while (true) {
      var minPos = i;

      if (2 * i <= n && a[minPos][1] > a[2 * i][1]) minPos = 2 * i;
      if (2 * i + 1 <= n && a[minPos][1] > a[2 * i + 1][1]) minPos = 2 * i + 1;

      if (minPos === i) break;

      swap(a, i, minPos);

      i = minPos;
    }
  }

  var map = new Map(),
    res = [];

  for (var num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  if (map.size <= k) {
    return [...map.keys()];
  }

  var a = [null, ...map.entries()],
    n = a.length;

  var minHeap = buildMinHeap(a, k);

  for (var i = k + 1; i < n; i++) {
    if (a[i][1] > minHeap[1][1]) {
      swap(minHeap, 1, i);
      heapify(minHeap, k, 1);
    }
  }

  for (var i = 1; i <= k; i++) {
    res.push(minHeap[i][0]);
  }

  return res;
}
