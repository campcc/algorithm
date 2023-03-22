// 二分搜索树: 每个节点的键值大于左孩子且小于右孩子
// 基础操作:
// 1. 插入 insert
// 2. 查找 find
// 3. 删除 delete
// 常见应用:
// 1. 求最大最小值 maximum minimum
// 2. 查找节点的前驱 successor 和后继 predecessor
// 3. 查找上界和下界 floor cell
// 4. 查找某个元素的排名 rank
// 5. 寻找底 k 大或小的元素 select

const { TreeNode } = require("../LinkedList/TreeNode");

// Q1: 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先
// 利用 BST 特性递归
// 1. p q 都小于 root, 在左子树中继续查找
// 2. p q 都大于 root, 在右子树中继续查找
// 3. 否则当前 root 就是 p q 的最近公共祖先
function lowestCommonAncestor(root, p, q) {
  if (root === null) {
    return null;
  }

  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  }

  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  }

  return root;
}

// Q2: 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树
// 先判断当前节点，然后递归判断子节点
function isValidBST(root) {
  const dfs = (node, lower, upper) => {
    if (node === null) {
      return true;
    }

    if (node.val <= lower || node.val >= upper) {
      return false;
    }

    return dfs(node.left, lower, node.val) && dfs(node.right, node.val, upper);
  };

  return dfs(root, -Infinity, Infinity);
}

// 利用 BST 特性，中序遍历结果一定为升序
// 我们可以中序遍历二叉树，判断当前节点值是否大于前一个节点值，如果满足说明不是 BST
function isValidBST(root) {
  var stack = [],
    cur = root,
    prev = -Infinity;

  while (stack.length || cur) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }

    var top = stack.pop();

    if (top.val <= prev) {
      return false;
    }

    prev = top.val;

    cur = top.right;
  }

  return true;
}

// Q3: 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变
// 利用 BST 的特性我们可以很快的删除节点, 关键在于删除后其子树如何保证仍是 BST, 这里可以分情况讨论
// 1. 如果删除的是叶子节点, 没有子树, 直接删除
// 2. 如果删除的节点有左子树无右子树, 此时可以直接将它的左子树作为新的子树返回
// 3. 如果删除的节点有右子树无左子树, 此时可以直接将它的右子树作为新的子树返回
// 4. 如果删除的节点有左右子树, 我们需要找到右子树中最小的一个节点, 删除该节点并将他作为新子树的根节点, 然后合并左右子树返回即可
// 由于 BST 的特性, 右子树中最小的节点仍大于左子树中所有的节点, 所以它可以作为新子树的根节点
function deleteNode(root, key) {
  if (root === null) {
    return null;
  }

  // 首先找到删除的节点
  if (key < root.val) {
    root.left = deleteNode(root.left, key);
    return root;
  }

  if (key > root.val) {
    root.right = deleteNode(root.right, key);
    return root;
  }

  if (key === root.val) {
    if (root.left === null && root.right === null) {
      return null;
    }

    if (root.left === null) {
      return root.right;
    }

    if (root.right === null) {
      return root.left;
    }

    // 找到右子树中最小的节点
    var successor = root.right;
    while (successor.left) {
      successor = successor.left;
    }
    // 在右子树中删除该节点
    root.right = deleteNode(root.right, successor.val);
    // 将该节点作为新的子树根节点返回
    successor.left = root.left;
    successor.right = root.right;
    return successor;
  }
}

// Q4: 将有序数组转换为二叉搜索树, 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵高度平衡二叉搜索树
// 高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树
// 很明显, 我们需要利用中序遍历与 BST 的关系, 我们知道 BST 的中序遍历结果为升序数组,
// 为了保证构建的 BST 是高度平衡的, 我们可以选择数组中点作为根节点
// 1. 如果保证构建的树为 BST? 我们可以考虑假设数组长度为 3, 我们选第二个节点作为 BST 根节点, 那么左子树节点为第一个, 右子树为第 3 个
// 类似的, 对于长度为 n 的数组, 我们可以递归选择中点进行构建
function sortedArrayToBST(nums) {
  const build = (nums, l, r) => {
    if (l > r) {
      return null;
    }

    var mid = l + Math.floor((r - l) / 2);
    var root = new TreeNode(nums[mid]);
    root.left = build(nums, l, mid - 1);
    root.right = build(nums, mid + 1, r);
    return root;
  };

  return build(nums, 0, nums.length - 1);
}
