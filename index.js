// 实现new的原理
function myNew(fn, ...args) {
  // 创建一个对象，并且将这个对象的__proto__属性指向fn的prototype
  const obj = Object.create(fn.prototype)  
  // 调用fn，并且将fn中的this改变为obj
  const result = fn.apply(obj, args)
  
  // 当构造函数fn返回值是一个引用类型时，那么返回的对象就是这个引用类型，如果不是的话，就返回obj
  if (typeof result === 'object') return result
  return obj
}