// 节流，每隔一段时间执行一次
function throttle(fn, delay) {
  var timer = null;

  return function () {
    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}
