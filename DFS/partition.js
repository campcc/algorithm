/**
 * 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案
 */

// 回溯，dfs 可以定义为从第一个字符（索引 0）开始，枚举所有可能的分割方案
// 1.终止条件：枚举完所有字符，index = s.length
// 2.做选择：从当前字符开始，假设当前索引为 index, 选择所有剩余的字符进行组合，[index...s.length - 1]
// 3.如果组合满足回文，准备缓存结果（此时我们在 index 对应的路径的起点上），接着继续探索当前路径，枚举完当前路径下的所有组合
// 4.枚举完当前路径下的所有可能后，将探索过的路径依次清空，回到起点，继续尝试其他可能
function partition(s) {
  if (s === "") {
    return [];
  }

  var res = [],
    combition = [];

  const dfs = (index) => {
    // 终止条件，枚举完所有字符
    if (index === s.length) {
      res.push(combition.slice());
      return;
    }

    // 枚举所有的可能
    for (var i = index; i < s.length; i++) {
      if (isPalindrome(s, index, i)) {
        combition.push(s.substring(index, i + 1));
        // 枚举当前 index 下的所有可能
        dfs(i + 1);
        // 当前 index 下的所有可能枚举完成后，回溯，
        // 回溯相当于清空了当前 index 从起点开始探索的所有路径，回到了 index 起点位置
        // 接着 i++，从下一个字符开始重复上述过程
        combition.pop();
      }
    }
  };

  dfs(0);

  return res;
}

// dfs 也可以每次传入缓存路径，不影响整体思路
function partition(s) {
  if (s === "") {
    return;
  }

  var res = [];

  const dfs = (path, index) => {
    if (index === s.length) {
      res.push(path.slice());
      return;
    }

    for (var i = index; i < s.length; i++) {
      if (isPalindrome(s, index, i)) {
        path.push(s.substring(index, i + 1));
        dfs(path, i + 1);
        path.pop();
      }
    }
  };

  dfs([], 0);

  return res;
}

function isPalindrome(s, i, j) {
  while (i < j) {
    if (s[i] !== s[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
}

// 我们可以根据上面的思路，抽象出回溯思想的基本框架
// 1.定义 res, path
// 2.定义 dfs 函数，参数为尚未探索过的区域，path 可做也可以不做为参数（缓存与否均可）
// 3.判断如果满足终止条件，将当前路径深拷贝后加入结果集，返回
// 4.开始枚举所有的可能，做选择
// 5.如果选择符合要求，将当前选择加入路径，然后从当前选择的下一个选择开始继续探索，直到当前选择到达终止条件
// 6.回溯，清空刚才的选择，从下一个未探索的区域继续
// function backtrack() {
//   var res = [],
//     path = [];

//   const dfs = () => {
//     if (满足终止条件) {
//       res.push(path.slice()); // 深拷贝
//       return;
//     }

//     for ( 选择 ... 未探索区域可能的选择) {
//       if (选择满足条件) {
//         path.push(选择)
//         dfs(当前选择剩余的未探索区域)
//         path.pop()
//       }
//     }
//   };
// }
