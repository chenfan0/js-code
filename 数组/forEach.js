Array.prototype.myForEach = function (callback, thisArg) {
  // 获取要遍历的数组
  const arr = this
  
  // 判断传入的第一个参数是否为函数，如果抛出异常
  if (!typeof callback !== 'function') {
      throw new TypeError(`${callback} is not a function`)
  }
  
  for (let i = 0; i < arr.length; i++) {
      callback.call(thisArg, arr[i], i, arr)
  }
}


