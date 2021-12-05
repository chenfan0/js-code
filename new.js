function myNew(fn, ...args) {
  // 1. 创建一个新对象
  const obj = {}

  // 2. 将该对象的隐式原型指向构造函数的显示原型
  obj.__proto__ = fn.prototype
  // 3. 执行函数
  const res = fn.apply(obj, args)

  // 4. 判断函数返回值是否为引用类型
  if (typeof res !== 'object' || res === null) { // 不是引用类型
    return obj
  } else {
    return res
  }
}



// test code

function foo(name, age) {
  this.name = name
  this.age = age
  return null
}

const obj = new foo('aaa', 18)
const obj2 = myNew(foo, 'aaa', 18)

console.log(obj)
console.log(obj.__proto__ === obj2.__proto__);  // true
console.log(obj2);
