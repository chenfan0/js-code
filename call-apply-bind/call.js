Function.prototype.myCall = function (thisArgs, ...args) {
  // 获取函数
  const fn = this

  // 边界判断，如果为undefined或者null绑定为全局的，否则用Object包裹，防止传进来的不是引用类型
  thisArgs = (thisArgs === undefined || thisArgs === null) ? globalThis : Object(thisArgs)
  // 创建一个symbol作为key，防止key名冲突覆盖
  const sym = Symbol()
  // 将函数赋值给对象的属性
  thisArgs[sym] = fn
  // 调用时，直接将该对象增加的属性删除，这样就不会打印时看着多了一个新属性
  return thisArgs[sym](...(delete thisArgs[sym] === true ? args : undefined))
}

// test code
function foo(x) {
  console.log(this);
  console.log(x);
  return 123
}
const obj = {}
foo.call(Symbol(), 10)
foo.myCall(Symbol(), 10)
