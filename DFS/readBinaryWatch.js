/**
 * 二进制手表顶部有 4 个 LED 代表 小时（0-11），底部的 6 个 LED 代表 分钟（0-59）
 * 小时：1，2，4，8
 * 分钟：1，2，4，8，16，32
 * 例如 [[1, 2], [1, 8, 16]] 代表 3:25
 * 给你一个整数 turnedOn ，表示当前亮着的 LED 的数量，返回二进制手表可以表示的所有可能时间
 * 0 <= turnedOn <= 10
 * turnedOn = 1 // ["0:01", "0:02", "0:04", "0:08", "0:16", "0:32", "1:00", "2:00", "4:00", "8:00"]
 */

function readBinaryWatch(turnedOn) {
  var res = [],
    hours = [1, 2, 4, 8, 0, 0, 0, 0, 0, 0],
    minutes = [0, 0, 0, 0, 1, 2, 4, 8, 16, 32];

  var dfs = (turnedOn, index, hour, minute) => {
    if (hour > 11 || minute > 59) {
      return;
    }

    if (turnedOn === 0) {
      var m = minute >= 10 ? minute : "0" + minute;
      res.push(hour + ":" + m);
      return;
    }

    for (var i = index; i < 10; i++) {
      dfs(turnedOn - 1, i + 1, hour + hours[i], minute + minutes[i]);
    }
  };

  dfs(turnedOn, 0, 0, 0);

  return res;
}

console.log(readBinaryWatch(1));
