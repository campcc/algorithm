/**
 * 给你二叉树的根节点 root 和一个整数目标和 targetSum
 * 找出所有从根节点到叶子节点路径总和等于给定目标和的路径
 */

// 最简单的思路, 先求出所有路径, 遍历路径数组找到满足路径和的路径
function pathSum(root, targetSum) {
  const binaryTreePaths = (root) => {
    var res = [];

    if (root === null) {
      return [];
    }

    if (root.left === null && root.right === null) {
      res.push([root.val]);
      return res;
    }

    var leftPaths = binaryTreePaths(root.left);
    var rightPaths = binaryTreePaths(root.right);

    for (var path of leftPaths) {
      res.push([root.val, ...path]);
    }

    for (var path of rightPaths) {
      res.push([root.val, ...path]);
    }

    return res;
  };

  var res = [];

  var paths = binaryTreePaths(root);

  for (var path of paths) {
    if (path.reduce((acc, cur) => acc + cur, 0) === targetSum) {
      res.push(path);
    }
  }

  return res;
}

// 实际上, 我们可以在遍历的过程中直接进行求和
// 每遍历到一个节点, 我们将和更新为当前节点与目标和的差值, 这样当递归遇到叶子节点时, 只需要判断差值是否为 0 即可
function pathSum(root, targetSum) {
  var path = [],
    res = [];

  const dfs = (root, target) => {
    if (root === null) {
      return;
    }

    path.push(root.val);
    target -= root.val;

    if (root.left === null && root.right === null && target === 0) {
      res.push([...path]);
    }

    dfs(root.left, target);
    dfs(root.right, target);
    path.pop();
  };

  dfs(root, targetSum);

  return res;
}

// 类似的, 我们也可以通过 BFS 来遍历, 考虑维护一个同步的路径队列,
// 遇到叶子节点时, 取出队列头部元素与当前叶子节点相加判断是否与目标和相等
function pathSum(root, targetSum) {
  var queue = [],
    paths = [],
    res = [];

  if (root === null) {
    return [];
  }

  queue.push(root);
  paths.push([root.val]);

  while (queue.length) {
    var node = queue.shift();
    var path = paths.shift();
    var sum = path.reduce((acc, cur) => acc + cur, 0);

    if (node.left === null && node.right === null && sum === targetSum) {
      res.push(path);
    } else {
      if (node.left) {
        queue.push(node.left);
        paths.push([...path, node.left.val]);
      }

      if (node.right) {
        queue.push(node.right);
        paths.push([...path, node.right.val]);
      }
    }
  }

  return res;
}

// 上述实现中, 我们维护了一个同步的路径队列, 每次计算和时我们都需要将路径累加
// 实际上, 我们可以存储每次计算的路径和的结果, 但是题设要求我们需要返回满足条件的路径, 如何获取路径呢?
// 这里可以借助哈希表, 我们维护一个当前节点与父节点的映射, 这样当我们找到满足条件的节点时, 只需要沿着其父节点一直往上查找就可以获得完整的路径
function pathSum(root, targetSum) {
  var queue = [],
    paths = [],
    res = [],
    map = new Map();

  if (root === null) {
    return [];
  }

  queue.push(root);
  paths.push(0);

  while (queue.length) {
    var node = queue.shift();
    var sum = paths.shift() + node.val;

    if (node.left === null && node.right === null && sum === targetSum) {
      var path = getPath(node, map);
      res.push(path);
    } else {
      if (node.left) {
        queue.push(node.left);
        paths.push(sum);
        map.set(node.left, node);
      }

      if (node.right) {
        queue.push(node.right);
        paths.push(sum);
        map.set(node.right, node);
      }
    }
  }

  return res;
}

function getPath(node, map) {
  var path = [];

  while (node) {
    path.push(node.val);
    node = map.get(node);
  }

  path.reverse();

  return path;
}
