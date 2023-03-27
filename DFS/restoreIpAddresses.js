/**
 * 给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成
 * 有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔
 * s = "25525511135" // ["255.255.11.135","255.255.111.35"]
 */

// 回溯，我们先考虑暴力解法
// IP 地址有 4 段，针对每一段，我们每次可以选取 [1, 3] 个字符，假设我们选取了 i 个字符，选取完一段后，进入下一段，从 i + 1 开始继续
// 递归终止条件：选取了 4 段 IP 地址
// 什么时候加入结果集：选取了 4 段 IP 地址并且字符串全部用完 i = s.length
function restoreIpAddresses(s) {
  var segments = [],
    res = [];

  const dfs = (s, segId, start) => {
    if (segId === 4) {
      if (start === s.length) {
        res.push(segments.join("."));
      }
      return;
    }

    var address = "";
    for (var i = start; i < s.length; i++) {
      address += s.charAt(i);
      if (+address > 0 && +address <= 255) {
        segments[segId] = address;
        dfs(s, segId + 1, i + 1);
      } else {
        break;
      }
    }
  };

  dfs(s, 0, 0);

  return res;
}

// 上述的暴力解法会导致重复解，并且当 IP 地址的某一段第一位数字为 0 时，此时整段应该都为 0
// 我们考虑优化上述暴力解法，加入一个剪枝条件和特殊判断
// 1. 如果还没找到 4 段 IP 就已经遍历完了字符串，说明不可能存在解提前回溯
// 2. 如果当前数字为 0，将整段设置为 0，继续寻找下一段
function restoreIpAddresses(s) {
  var segments = [],
    res = [];

  const dfs = (s, segId, start) => {
    if (segId === 4) {
      if (start === s.length) {
        res.push(segments.join("."));
      }
      return;
    }

    if (start === s.length) {
      return;
    }

    if (s.charAt(start) === "0") {
      segments[segId] = 0;
      dfs(s, segId + 1, start + 1);
    }

    var address = "";
    for (var i = start; i < s.length; i++) {
      address += s.charAt(i);
      if (+address > 0 && +address <= 255) {
        segments[segId] = address;
        dfs(s, segId + 1, i + 1);
      } else {
        break;
      }
    }
  };

  dfs(s, 0, 0);

  return res;
}

var s = "25525511135";
var res = restoreIpAddresses(s);
console.log(res);
