/**
 * 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target
 * 请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]]
 * 0 <= a, b, c, d < n
 * a、b、c 和 d 互不相同
 * nums[a] + nums[b] + nums[c] + nums[d] == target
 */

function fourSum(nums, target) {
  nums.sort((a, b) => a - b);

  var n = nums.length,
    res = [];

  if (n < 4) {
    return res;
  }

  for (var i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
      break;
    }

    if (nums[i] + nums[n - 3] + nums[n - 2] + nums[n - 1] < target) {
      continue;
    }

    for (var j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue;
      }

      if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) {
        break;
      }

      if (nums[i] + nums[j] + nums[n - 2] + nums[n - 1] < target) {
        continue;
      }

      var l = j + 1,
        r = n - 1;

      while (l < r) {
        var sum = nums[i] + nums[j] + nums[l] + nums[r];

        if (sum === target) {
          res.push([nums[i], nums[j], nums[l], nums[r]]);

          while (l < r && nums[l] === nums[l + 1]) {
            l++;
          }

          while (l < r && nums[r] === nums[r - 1]) {
            r--;
          }

          l++;
          r--;
        } else if (sum < target) {
          l++;
        } else {
          r--;
        }
      }
    }
  }

  return res;
}
