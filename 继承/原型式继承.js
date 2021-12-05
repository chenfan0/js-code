// 核心
function object(obj) {
  const fn = function () { }
  fn.prototype = obj
  return new fn()
}

const obj = {
  name: 'obj',
  friends: [1, 2, 3]
}

const obj1 = object(obj)
console.log(obj1.name);   // 继承obj的属性

/**
 * 缺点：多个实例继承的引用类型会互相影响
 *       无法传递参数
 */

