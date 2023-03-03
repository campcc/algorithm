/**
 * 有一个单链表的 head，我们想删除它其中的一个节点 node，你只能拿到需要删除的节点 node，无法访问 head
 */

function deleteNode(node) {
  if (node === null) {
    return;
  }

  if (node.next === null) {
    node = null;
    return;
  }

  node.val = node.next.val;
  node.next = node.next.next;
}
