/**
 * 给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字
 * 每条从根节点到叶节点的路径都代表一个数字：
 * 例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123
 * 计算从根节点到叶节点生成的 所有数字之和
 * root = [1,2,3] // 12 + 13 = 25
 */

// 常规思路, 先求所有路径, 然后计算路径数字和
function sumNumbers(root) {
  var paths = [],
    res = 0;

  const dfs = (root, path) => {
    if (root === null) {
      return;
    }

    path += root.val.toString();

    if (root.left === null && root.right === null) {
      paths.push(path);
    } else {
      dfs(root.left, path);
      dfs(root.right, path);
    }
  };

  dfs(root, "");

  for (var path of paths) {
    res += parseInt(path);
  }

  return res;
}

// 也可以使用 BFS 层序遍历, 维护一个同步的路径和队列, 遇到叶子节点时, 取出队列头部元素计算当前的路径和
function sumNumbers(root) {
  var queue = [],
    paths = [],
    sum = 0;

  queue.push(root);
  paths.push(root.val);

  while (queue.length) {
    var node = queue.shift();
    var num = paths.shift();

    if (node.left === null && node.right === null) {
      sum += num;
    } else {
      if (node.left) {
        queue.push(node.left);
        paths.push(num * 10 + node.left.val);
      }

      if (node.right) {
        queue.push(node.right);
        paths.push(num * 10 + node.right.val);
      }
    }
  }

  return sum;
}
