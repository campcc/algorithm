/**
 * 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点
 */

// DFS 有两种思路，第一种思路是自底向上
// 借助函数调用栈，和递归终止条件，从最后一个非叶子子节点，翻转其左右子节点，然后依次向上进行翻转
function invertTree(root) {
  if (root === null) {
    return root;
  }

  var left = invertTree(root.left);
  var right = invertTree(root.right);
  root.left = right;
  root.right = left;

  return root;
}

// 第二种思路是自顶向下
// 我们先翻转当前节点，然后递归地翻转其左子节点和右子节点
function invertTree(root) {
  if (root === null) {
    return root;
  }

  var temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);

  return root;
}

// 也可以借助 BFS，翻转二叉树就是翻转其所有非叶子节点的左右子节点
// 由于层序遍历会遍历所有节点，我们只需要将遍历到的每一非叶子节点的左右子节点交换即可完成整棵二叉树的翻转
function invertTree(root) {
  if (root === null) {
    return root;
  }

  var queue = [];

  queue.push(root);

  while (queue.length) {
    var node = queue.shift();

    if (node.left || node.right) {
      var temp = node.left;
      node.left = node.right;
      node.right = temp;
    }

    if (node.left) {
      queue.push(node.left);
    }

    if (node.right) {
      queue.push(node.right);
    }
  }

  return root;
}
