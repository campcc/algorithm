/**
 * 给你两个单词 beginWord 和 endWord 和一个字典 wordList ，返回从 beginWord 到 endWord 的最短转换序列中的单词数目
 * 如果不存在这样的转换序列，返回 0
 * beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
 * 返回 5， "hit" -> "hot" -> "dot" -> "dog" -> "cog"
 */

// 无权图，考虑将每个单词抽象为一个点，如果两个单词可以只改变一个字母进行转换，说明他们之间有一条边
// 相当于以 beginWord 为图的起点，寻找到达 endWord 的最短路径
function ladderLength(beginWord, endWord, wordList) {}
