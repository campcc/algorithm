/**
 * 给你一个二叉树的根节点 root ，按 任意顺序 ，返回所有从根节点到叶子节点的路径
 * root = [1, 2, 3, null, 5] // ["1->2->5", "1->3"]
 */

// 递归, 考虑叶子和非叶子节点两种情况
// 1. 如果是叶子节点, 将值加入路径
// 2. 如果是非叶子节点, 拼接 -> 继续遍历其左右子节点
function binaryTreePaths(root) {
  var res = [];

  const dfs = (root, path) => {
    if (root === null) {
      return;
    }

    path += root.val;

    if (root.left === null && root.right === null) {
      res.push(path);
    } else {
      path += "->";
      dfs(root.left, path);
      dfs(root.right, path);
    }
  };

  dfs(root, "");

  return res;
}

// 也可以先求出左右子节点的路径, 然后拼接
function binaryTreePaths(root) {
  var res = [];

  if (root === null) {
    return res;
  }

  if (root.left === null && root.right === null) {
    res.push(root.val.toString());
    return res;
  }

  var leftPaths = binaryTreePaths(root.left);
  var rightPaths = binaryTreePaths(root.right);

  for (var path of leftPaths) {
    res.push(root.val + "->" + path);
  }

  for (var path of rightPaths) {
    res.push(root.val + "->" + path);
  }

  return res;
}

// BFS, 层序遍历节点的过程中, 再同步维护一个路径队列 paths
// 1. 如果遇到叶子节点, 取出 paths 队首元素 path 直接加入路径数组
// 2. 如果遇到非叶子节点, 如果其子节点存在, 往 paths 中推入一个拼接子节点的临时路径
function binaryTreePaths(root) {
  var queue = [],
    paths = [],
    res = [];

  if (root === null) {
    return [];
  }

  queue.push(root);
  paths.push(root.val.toString());

  while (queue.length) {
    var node = queue.shift();
    var path = paths.shift();

    if (node.left === null && node.right === null) {
      res.push(path);
    } else {
      if (node.left) {
        paths.push(path + "->" + node.left.val);
        queue.push(node.left);
      }

      if (node.right) {
        paths.push(path + "->" + node.right.val);
        queue.push(node.right);
      }
    }
  }

  return res;
}
