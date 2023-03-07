const { TreeNode } = require("../LinkedList/TreeNode");
/**
 * 二叉树遍历
 */

function Command(order, node) {
  this.order = order;
  this.node = node;
}

// 调用栈模拟
function preorderTraversal(root) {
  var res = [];

  if (root === null) {
    return res;
  }

  var stack = [];

  stack.push(new Command("go", root));

  while (stack.length) {
    var command = stack.pop();

    if (command.order === "print") {
      res.push(command.node.val);
    } else {
      if (command.node.right) {
        stack.push(new Command("go", command.node.right));
      }
      if (command.node.left) {
        stack.push(new Command("go", command.node.left));
      }
      stack.push(new Command("print", command.node));
    }
  }

  return res;
}

// 简化一下就是
function preorderTraversal(root) {
  var res = [];

  if (root === null) {
    return res;
  }

  var stack = [];

  stack.push([0, root]);

  while (stack.length) {
    var [flag, node] = stack.pop();

    if (node && flag === 1) {
      res.push(node.val);
    } else {
      if (node.right) {
        stack.push([0, node.right]);
      }

      if (node.left) {
        stack.push([0, node.left]);
      }

      stack.push([1, node]);
    }
  }

  return res;
}

// 递归
function preorderTraversal(root) {
  var res = [];

  function preorder(root) {
    if (root === null) {
      return;
    }

    res.push(root.val);
    preorder(root.left);
    preorder(root.right);
  }

  preorder(root);
  return res;
}

// 栈迭代还可以考虑另一种思路，由于前序遍历的顺序是：根 → 左 → 右
// 1.我们可以先将根节点和所有左子节点入栈，并记录入栈元素的值
// 2.然后每弹出一个节点，就访问其右节点，然后更新当前节点为右节点，继续尝试将其左子节点入栈，直到栈为空
function preorderTraversal(root) {
  var res = [];

  if (root === null) {
    return res;
  }

  var cur = root,
    stack = [];

  while (stack.length || cur) {
    while (cur) {
      res.push(cur.val);
      stack.push(cur);
      cur = cur.left;
    }

    var top = stack.pop();
    cur = top.right;
  }

  return res;
}

// 上述思路也可以应用到中序遍历
function inorderTraversal(root) {
  var res = [];

  if (root === null) {
    return res;
  }

  var stack = [],
    cur = root;

  while (stack.length || cur) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }

    var top = stack.pop();
    res.push(top.val);
    cur = top.right;
  }

  return res;
}
