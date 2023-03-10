// 白板编程：堆

// 辅助函数
function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

// 特性1
// 数组下标从 1 开始存储，对二叉树进行层序遍历后，对于任意节点，其左右子节点和父节点的下标 i 满足
// lelft = 2 * i
// right = 2 * i + 1
// parent = Math.floor(i / 2)

// 特性2
// 层序遍历后叶子节点分布在 [n/2...n], 非叶子节点分布在 [1...n]

// 1.构建最小堆
function buildMinHeap(a) {
  // 为了满足特性 1，我们插入一个空元素，从数组索引 1 开始存储
  a.unshift(null);

  var n = a.length;

  // 针对叶子节点，我们其实没有必要执行堆化操作，因为在其父节点的堆化中如果满足条件叶子节点会被交换，
  // 所以我们只需要对非叶子节点进行堆化 [n/2...1] 即可
  // 需要注意的是，这里我们遍历的顺序应该是从最后一个非叶子节点开始，为什么呢？
  // 不妨假设我们是从第一个非叶子节点元素开始堆化，也就是从堆顶元素开始
  // 由于我们是向下堆化，如果后续的节点中存在最小值，我们没有办法保证这个最小值可以上浮到堆顶，所以这里我们应该从最后一个非叶子节点开始往下堆化
  // 相反，如果我们从最后一个非叶子节点开始，最后一个非叶子节点只有两个子节点，当我们堆化到第一个非叶子节点时，一定可以保证最小的元素被交换到堆顶
  for (var i = Math.floor(n / 2); i >= 1; --i) {
    heapifyMin(a, n, i);
  }

  return a;
}

// 堆化操作本质上就是交换元素，对任意索引为 i 的节点，需要找到 a[i] 可以下沉的极限
// 每一次下沉相当于，找到 a[i] 的左右子节点中较小的值，与 a[i] 交换，直到不存在子节点值比 a[i] 小
// 实现上，我们可以假设当前 a[i] 可以下沉的最小索引值 minPos 就是 i，通过比较左右子节点的值更新 minPos，
// 如果左子节点的值小于 a[i]，我们更新 minPos 为左子节点索引；如果右子节点的值较小，我们更新 minPos 为右子节点的索引，
// 如果比较后 minPos 还是等于 i，说明没有比 a[i] 更小的子节点可以交换，意味着我们找到了节点 a[i] 应该存在的位置，可以跳出循环
// 否则我们交换索引为 i 和 minPos 的节点完成一次下沉，在交换后我们更新当前位置 i 为 maxPos，触发循环继续下沉
function heapifyMin(a, n, i) {
  while (true) {
    var minPos = i;

    if (i * 2 <= n && a[minPos] > a[i * 2]) minPos = i * 2;
    if (i * 2 + 1 <= n && a[minPos] > a[i * 2 + 1]) minPos = i * 2 + 1;

    if (minPos === i) break;

    swap(a, i, minPos);

    i = minPos;
  }
}

// 2.构建最大堆
function buildMaxHeap(a) {
  a.unshift(null);

  var n = a.length;

  // 与最小堆构建类似，构建最大堆时，我们也需要从最后一个非叶子节点开始往下堆化
  for (var i = Math.floor(n / 2); i >= 1; --i) {
    heapifyMax(a, n, i);
  }

  return a;
}

// 最大堆从上往下堆化
function heapifyMax(a, n, i) {
  while (true) {
    var maxPos = i;

    if (2 * i <= n && a[maxPos] < a[2 * i]) maxPos = 2 * i;
    if (2 * i + 1 <= n && a[maxPos] < a[2 * i + 1]) maxPos = 2 * i + 1;

    if (maxPos === i) break;

    swap(a, i, maxPos);

    i = maxPos;
  }
}

// 3.删除堆顶元素，为了防止出现数组空洞，堆化后不满足堆的特性，
// 我们可以考虑将最后一个叶子节点与堆顶元素交换，然后向下堆化
function removeTop(heap) {
  var n = heap.length;

  // 从索引 1 开始存储，堆顶元素索引为 1
  swap(heap, 1, n - 1);

  heap.pop();

  heapifyMax(heap, n - 1, 1);
}

// 4.删除任意元素
// 删除堆顶元素实现后，删除任意元素就很简单了，只需要将删除的元素交换到堆顶，再删除堆顶元素即可
function remove(heap, i) {
  swap(heap, 1, i);

  removeTop(heap);
}

// 5.插入元素
// 插入元素有点不同，一般往堆中插入元素，我们会将元素插入到数组尾部，也就是堆中的最后一个叶子节点
// 为了保持堆的特性，这次我们需要从下往上进行堆化，我们可以顺着元素的父节点所在的路径，一直往上比较，直到不满足交换条件为止
// 以最大堆为例
function instert(heap, val) {
  heap.push(val);

  var i = heap.length - 1;

  // 从下往上堆化
  while (true) {
    var maxPos = i;

    var parentIndex = Math.floor(i / 2);

    // 如果当前元素比父元素大，交换，直到当前元素不大于父元素为止
    if (parentIndex >= 1 && heap[maxPos] > heap[parentIndex]) maxPos = parentIndex;

    if (maxPos === i) break;

    swap(heap, i, maxPos);

    i = maxPos;
  }
}

var a1 = [6, 5, 4, 3, 2, 1];
var a2 = [1, 2, 3, 4, 5, 6];
var minHeap = buildMinHeap(a1);
var maxHeap = buildMaxHeap(a2);
console.log(minHeap, maxHeap);

// removeTop(maxHeap);
// console.log(maxHeap);

//   6
//  5   3
// 4 2 1

//   5
//  4   3
// 1  2

// remove(maxHeap, 2);
// console.log(maxHeap);

//   5
//  6   3
// 4 2 1

//   1
//  6   3
// 4 2

//   6
//  4   3
// 1 2

// instert(maxHeap, 10);
// console.log(maxHeap);

// 第一次插入

//   6
//  5   3
// 4 2 1  10

//   6
//  5   10
// 4 2 1  3

//   10
//  5   6
// 4 2 1  3

// instert(maxHeap, 7);
// console.log(maxHeap);

// 第二次插入

//    10
//   5   6
//  4 2 1  3
// 7

//    10
//   5   6
//  7 2 1  3
// 4

//    10
//   7   6
//  5 2 1  3
// 4
