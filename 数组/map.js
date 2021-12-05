Array.prototype.myMap = function (callback, thisArg) {
  // 判断传入的第一个参数是否为函数
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`)
  }

  const arr = this
  const newArr = []

  for (let i = 0; i < arr.length; i++) {
    newArr.push(callback.call(thisArg, arr[i], i, arr))
  }
  return newArr
}

const arr = [1, 2, 3, 4]

const arr1 = arr.map((item, index, arr) => {
  return item * 2
})
const arr2 = arr.myMap((item, index, arr) => {
  // return item * 2
})
console.log(arr1);
console.log(arr2);
