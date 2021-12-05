Array.prototype.myEvery = function (callback, thisArg) {
  // 判断传入的第一个参数是否为函数
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`)
  }

  const arr = this

  for (let i = 0; i < arr.length; i++) {
    if (callback.call(thisArg, arr[i], i, arr)) {
      continue
    }
    return false
  }
  return true
}


const arr = []
const a = arr.every((item, index, arr) => {
  console.log(item);
  return undefined
})

const b = arr.myEvery((item, index, arr) => {
  console.log(item);
  return undefined
})

// const b = arr.every((item, index, arr) => {
//   return this
// }, {})
// arr.every()
console.log(a);
console.log(b);
// console.log(b);