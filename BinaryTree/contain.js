/**
 * 给你一个二叉树，判断其中是否存在键值 key
 */

function contain(node, key) {
  if (node === null) {
    return false;
  }

  if (node.key === key) {
    return true;
  }

  if (contain(node.left, key) || contain(node.right, key)) {
    return true;
  }

  return false;
}

function destroy(node) {
  if (node === null) {
    return;
  }

  destroy(node.left);
  destroy(node.right);

  delete node;
}
