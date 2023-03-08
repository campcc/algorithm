/**
 * 给你二叉树的根节点 root ，返回其节点值的层序遍历
 * root = [3,9,20,null,null,15,7]  // [[3],[9,20],[15,7]]
 */

function levelOrder(root) {
  var res = [];

  if (root === null) {
    return res;
  }

  var queue = [];

  queue.push(root);

  while (queue.length) {
    // 获取当前队列的长度，相当于当前这一层的节点个数
    var size = queue.length;

    // 初始化一个临时数组，存储当前层的元素
    var temp = [];

    // 将当前层的元素都拿出来，放到临时数组，如果出队的元素有左右子节点，继续放入队列
    // 由于我们是从 [0...size - 1] 进行遍历，所以可以遍历当前层的所有节点，而当前层节点的所有子节点会从索引 size 开始存储
    // 我们假设当前层节点的所有子节点的总数为 n, 下一次循环时继续遍历 [size, size + n]，一直重复直到队列为空，我们就完成了整个二叉树每一层元素的遍历
    var i = 0;
    while (i < size) {
      var node = queue.shift();
      temp.push(node.val);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }

      i++;
    }

    // 当前层元素放入结果集
    res.push(temp);
  }

  return res;
}

// 我们也可以通过记录当前遍历到节点的层级来实现逐层遍历
// 我们借助一个辅助的数据结构，存储节点和层级
function Node(node, level) {
  this.node = node;
  this.level = level;
}

function levelOrder(root) {
  var res = [];

  if (root === null) {
    return res;
  }

  var queue = [];

  // level 从 0 开始，方便加入结果集
  queue.push(new Node(root, 0));

  while (queue.length) {
    var { node, level } = queue.shift();

    // 如果结果集长度与 level 相同，说明我们需要把当前节点加入对应 level 的结果集
    // 我们初始化当前 level 的数组用于存储遍历到的节点
    if (level === res.length) {
      res.push([]);
    }

    // 将所有节点加入 level 结果集
    res[level].push(node.val);

    // 如果加入的节点有子节点，level + 1 后存入队列，下一次遍历继续加入结果集
    if (node.left) {
      queue.push(new Node(node.left, level + 1));
    }

    if (node.right) {
      queue.push(new Node(node.right, level + 1));
    }
  }

  return res;
}

// 变种1：要求返回自底向上的层序遍历结果
// 这里有两种思路，一种是我们将层序遍历的结果集直接反转，或者在加入结果集时往数组头部插入
function levelOrderBottom(root) {
  if (root === null) {
    return [];
  }

  var res = [],
    queue = [];

  queue.push(root);

  while (queue.length) {
    var size = queue.length,
      temp = [];

    var i = 0;
    while (i < size) {
      var node = queue.shift();
      temp.push(node.val);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }

      i++;
    }

    res.unshift(temp);
  }

  return res;
}

// 变种2：要求返回锯齿形的层序遍历结果
// 即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行
// 这里我们可以在每层遍历时加一个布尔值变量来判断是需要将节点加入数组末尾还是头部
function zigzagLevelOrder(root) {
  if (root === null) {
    return [];
  }

  var res = [],
    queue = [];

  queue.push(root);

  var isPushBack = true;

  while (queue.length) {
    var size = queue.length,
      temp = [];

    var i = 0;
    while (i < size) {
      var node = queue.shift();
      if (isPushBack) {
        temp.push(node.val);
      } else {
        temp.unshift(node.val);
      }

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }

      i++;
    }

    res.push(temp);

    isPushBack = !isPushBack;
  }

  return res;
}

// 变种3：想象你站在一颗二叉树的右侧，返回所有你能看见的节点
// 我们仍使用层序遍历，只是在加入结果集时，只加入数组的最后一个元素
function rightSideView(root) {
  if (root === null) {
    return [];
  }

  var res = [],
    queue = [];

  queue.push(root);

  while (queue.length) {
    var size = queue.length,
      temp = [];

    var i = 0;
    while (i < size) {
      var node = queue.shift();
      temp.push(node.val);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }

      i++;
    }

    res.push(temp.pop());
  }

  return res;
}
