/**
 * 数组扁平化
 */

function flatten(array) {
  var res = [];

  for (var i = 0; i < array.length; i++) {
    var a = array[i];

    if (Array.isArray(a)) {
      res.push(...flatten(a));
    } else {
      res.push(a);
    }
  }

  return res;
}
