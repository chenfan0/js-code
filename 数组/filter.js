Array.prototype.myFilter = function (callback, thisArg) {
  // 判断传入的第一个参数是否为函数
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`)
  }

  const arr = this
  const filterArr = []

  for (let i = 0; i < arr.length; i++) {
    if (callback.call(thisArg, arr[i], i, arr)) {
      filterArr.push(arr[i])
    }
  }
  return filterArr
}

const arr = [1, 2, 3, 8]
const arr1 = arr.filter((item) => {
  return item > 10
})
const arr2 = arr.myFilter((item) => {
  return item > 10
})

console.log(arr1);
console.log(arr2);

