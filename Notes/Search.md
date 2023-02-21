1. 两类查找问题

- 查找有无，set 集合
- 查找对应关系，键值对，map，字典

2. set 和 map，容器类

- 常见操作，insert、find、erase、change

3. map 和 set 底层实现通常为平衡二叉树，时间复杂度为 O(logn)，虽然使用哈希表实现为 O(1) 但是会失去有序性，在求rank，select，最值等场景会很麻烦

4. 