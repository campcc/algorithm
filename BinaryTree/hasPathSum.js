/**
 * 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum
 * 判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和 targetSum
 * 如果存在，返回 true ；否则，返回 false
 * root = [1,2,3], targetSum = 5 // false
 */

// 递归
// 1. 对于非叶子节点 node, 我们需要其左右子树中是否存在路径和值为 targetSum - node.val
// 2. 对于叶子节点, 我们直接判断当前的剩余路径和是否与叶子节点值相等即可
function hasPathSum(root, targetSum) {
  if (root === null) {
    return false;
  }

  if (root.left === null && root.right === null) {
    return root.val === targetSum;
  }

  if (hasPathSum(root.left, targetSum - root.val)) {
    return true;
  }

  if (hasPathSum(root.right, targetSum - root.val)) {
    return true;
  }

  return false;
}
