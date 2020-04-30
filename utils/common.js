// 数据类型判断
 function type(data) {
  return Object.prototype.toString.call(data).slice(8,-1)
}

// 函数防抖
 function debounce(func, wait) {
  let timer;
  return function () {
    let context = this; // 注意 this 指向
    let args = arguments; // arguments中存着e

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

// 函数节流
 function throttle(fn, interval = 300) {
   let canRun = true;
  return function () {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      canRun = true;
    }, interval);
  };
}

// 深复制
function deepClone(data) {
  var t = type(data), o, i, ni;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (i = 0, ni = data.length; i < ni; i++) {
      o.push(deepClone(data[i]));
    }
    return o;
  } else if (t === 'object') {
    for (i in data) {
      o[i] = deepClone(data[i]);
    }
    return o;
  }
}
module.exports = {
  type, // 类型判断
  debounce, // 防抖
  throttle, // 节流
  deepClone, // 深复制
}