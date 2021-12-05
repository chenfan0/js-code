Array.prototype.myFind = function (callback, thisArg) {
  // 判断传入的第一个参数是否为函数
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`)
  }

  const arr = this

  for (let i = 0; i < arr.length; i++) {
    if (callback.call(thisArg, arr[i], i, arr)) {
      return arr[i]
    }
  }
  return undefined
}

Array.prototype.myFindIndex = function (callback, thisArg) {
  // 判断传入的第一个参数是否为函数
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`)
  }

  const arr = this

  for (let i = 0; i < arr.length; i++) {
    if (callback.call(thisArg, arr[i], i, arr)) {
      return i
    }
  }
  return -1
}

const arr = [1, 5, 8, 9]

const arr1 = arr.find(item => item === 4)
const arr2 = arr.findIndex(item => item === 4)
const arr3 = arr.myFind(item => item === 4)
const arr4 = arr.myFindIndex(item => item === 4)
console.log(arr1);
console.log(arr2);
console.log(arr3);
console.log(arr4);

