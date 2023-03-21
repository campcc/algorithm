/**
 * 给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数
 * 完全二叉树：空树; 或者除了最后一层，所有层节点数达到最大，且最后一层的所有节点都在最左侧
 */

// 递归, 不考虑完全二叉树的特性
function countNodes(root) {
  if (root === null) {
    return 0;
  }

  return countNodes(root.left) + countNodes(root.right) + 1;
}

// BFS, 不考虑完全二叉树的特性
function countNodes(root) {
  if (root === null) {
    return 0;
  }

  var queue = [],
    count = 0;

  queue.push(root);

  while (queue.length) {
    count++;

    var node = queue.shift();

    if (node.left) {
      queue.push(node.left);
    }

    if (node.right) {
      queue.push(node.right);
    }
  }

  return count;
}

// 递归, 考虑完全二叉树的特性
// 1. 对 root 节点的左右子树高度进行统计,
// 2. 如果 l = r, 说明左子树一定满, 左子树的节点个数为 2 ^ l - 1, 加上 root 节点刚好是 2 ^ l 个, 再递归计算右子树即可
// 3. 如果 l != r, 说明最后一层不满并且一定是最后一层的左子树不满, 右子树的节点个数为 2 ^ r - 1, 加上 root 节点刚好是 2 ^ r, 再递归左子树即可
// 计算完全二叉树树层级可以考虑直接递归或迭代左子节点, 计算 2 的 n 次方可以考虑移位运算
function countNodes(root) {
  if (root === null) {
    return 0;
  }

  var l = countLevel(root.left);
  var r = countLevel(root.right);

  if (l === r) {
    return (1 << l) + countNodes(root.right);
  } else {
    return (1 << r) + countNodes(root.left);
  }
}

function countLevel(root) {
  var level = 0;

  while (root) {
    level++;
    root = root.left;
  }

  return level;
}
