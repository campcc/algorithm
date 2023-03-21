/**
 * 给定二叉树的根节点 root，返回所有左叶子之和
 */

// BFS 层序遍历, 仅当左子节点存在并且是叶子节点时, 计算和
function sumOfLeftLeaves(root) {
  if (root.left === null && root.right === null) {
    return 0;
  }

  var queue = [],
    sum = 0;

  queue.push(root);

  while (queue.length) {
    var node = queue.shift();

    if (node.left && node.left.left === null && node.left.right === null) {
      sum += node.left.val;
    }

    if (node.left) {
      queue.push(node.left);
    }

    if (node.right) {
      queue.push(node.right);
    }
  }

  return sum;
}

// 递归, 我们可以先递归计算左子节点的左叶子和, 右子节点的左叶子和, 然后再判断左子节点是否是叶子节点
function sumOfLeftLeaves(root) {
  if (root === null) {
    return 0;
  }

  var leftSum = sumOfLeftLeaves(root.left);
  var rightSum = sumOfLeftLeaves(root.right);

  if (root.left && root.left.left === null && root.left.right === null) {
    return leftSum + rightSum + root.left.val;
  }

  return leftSum + rightSum;
}
