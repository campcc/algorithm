/**
 * 给定一个二叉树，找出其最大深度
 */

// 递归
function maxDepth(root) {
  if (root === null) {
    return 0;
  }

  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

// BFS
function maxDepth(root) {
  var max = 0,
    queue = [];

  if (root === null) {
    return max;
  }

  queue.push(root);

  // 每次将当前层所有节点出队进行拓展
  while (queue.length) {
    var size = queue.length;

    while (size > 0) {
      var node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      size--;
    }

    max++;
  }

  return max;
}

// 变种1：求最小深度
// 递归，DFS 时需要注意叶子节点为空的情况
function minDepth(root) {
  if (root === null) {
    return 0;
  }

  if (root.left === null) {
    return minDepth(root.right) + 1;
  }

  if (root.right === null) {
    return minDepth(root.left) + 1;
  }

  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
}

// BFS 求最小高度：层序遍历时找到一个叶子节点直接返回叶子节点的深度
// 层序遍历时我们需要记录每一层节点的深度，这里可以借助一个辅助数据结构或者入队时直接使用数组辅助存储
function QueueNode(node, depth) {
  this.node = node;
  this.depth = depth;
}

function minDepth(root) {
  if (root === null) {
    return 0;
  }

  var queue = [];

  queue.push(new QueueNode(root, 1));

  while (queue.length) {
    var { node, depth } = queue.shift();

    if (node.left === null && node.right === null) {
      return depth;
    }

    if (node.left) {
      queue.push(new QueueNode(node.left, depth + 1));
    }

    if (node.right) {
      queue.push(new QueueNode(node.right, depth + 1));
    }
  }
}

function minDepth(root) {
  if (root === null) {
    return 0;
  }

  var queue = [];

  queue.push([root, 1]);

  while (queue.length) {
    var [node, depth] = queue.shift();

    if (node.left === null && node.right === null) {
      return depth;
    }

    if (node.left) {
      queue.push([node.left, depth + 1]);
    }

    if (node.right) {
      queue.push([node.right, depth + 1]);
    }
  }
}
