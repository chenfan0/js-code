Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`)
  }

  const arr = this
  let sum = 0
  let i = 0

  if (arguments.length === 1) {
    sum = arr[0]
    i = 1
  } else {
    sum = initialValue
  }
  
  for (; i < arr.length; i++) {
    callback(sum, arr[i], i, arr)
    sum += arr[i]
  }
  return sum
}


const arr = [3, 2, 3, 4]
// arr.reduce()
const sum = arr.reduce({}, {})

const sum1 = arr.myReduce({}, {})
// arr.reduce()
console.log(sum);
console.log(sum1);
// function foo(x = 1) {
//   console.log(foo.length);
//   console.log(x);
// }
// foo()