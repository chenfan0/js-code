Array.prototype.mySome = function (callback, thisArg) {
  // 判断传入的第一个参数是否为函数
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`)
  }
  
  const arr = this

  for (let i = 0; i < arr.length; i++) {
    if (callback.call(thisArg, arr[i], i, arr)) {
      return true
    }
  }
  return false
}

const arr = []

const a = arr.some((item, index, arr) => {
  console.log(item);
  return item > 2
})

const b = arr.mySome((item, index, arr) => {
  console.log(item);
  return item > 2
})
console.log(a);
console.log(b);