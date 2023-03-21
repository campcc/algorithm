/**
 * 给定一个二叉树，判断它是否是高度平衡的二叉树
 * 平衡二叉树: 一个二叉树每个节点的左右两个子树的高度差的绝对值不超过 1
 */

// 计算左右子树的最大深度的绝对值, 需要注意的是, 这里如果 root 是平衡二叉树, 其左右子树也应该是平衡二叉树
// 最大深度可以使用递归或 BFS
function isBalanced(root) {
  if (root === null) {
    return true;
  }

  var l = maxDepth(root.left);
  var r = maxDepth(root.right);

  return Math.abs(l - r) <= 1 && isBalanced(root.left) && isBalanced(root.right);
}

function maxDepth(root) {
  if (root === null) {
    return 0;
  }

  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

// 自顶向下的递归复杂度一般都高于自底向上的递归, 这里我们考虑自底向上的思路
// 我们不妨假设当前树是平衡二叉树, 然后递归到左右子树的底层节点, 从底层开始, 依次求出当前左右子节点的最大深度, 判断高度差如果不满足条件直接返回 false
function isBalanced(root) {
  var balanced = true;

  function maxDepth(root) {
    if (root === null) {
      return 0;
    }

    var l = maxDepth(root.left) + 1;
    var r = maxDepth(root.right) + 1;

    if (Math.abs(l - r) > 1) {
      balanced = false;
      return;
    }

    return Math.max(l, r);
  }

  maxDepth(root);

  return balanced;
}
