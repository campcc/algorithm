// 防抖，一段时间内只执行一次
function debounce(fn, delay) {
  var timer = null;

  return function () {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}
