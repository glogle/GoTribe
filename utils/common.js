// 数据类型判断
export function type(data) {
  return Object.prototype.toString.call(data).slice(8,-1)
}

// 函数节流

export function throttle(fn, interval = 300) {
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
  type,
  throttle,
  deepClone
}