function curring(fn) {
  // 返回一个函数
  return function curried(...args) {
    // 判断当前传入的参数，是否满足函数需要的参数
    if (args.length >= fn.length) {
      // 当传入的参数已经满足函数需要的参数，直接执行fn函数即可
      return fn.apply(this, args)
    } else {
      // 当传入的参数不满足函数fn所需要的的参数，需要再次返回一个函数
      return function (...args1) {
        // 重新调用curried函数
        return curried.apply(this, [...args, ...args1])
      }
    }
  }
}



// test code
function foo(x, y, z) {
  return x + y + z
}
const fn = curring(foo)
console.log(fn(1)(3, 2));

console.log(foo.length);

