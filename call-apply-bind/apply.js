Function.prototype.myApply = function (thisArgs, args) {
  // 保存调用函数
  const fn = this

  // 边界判断
  // 如果绑定的this是undefined或者null，那么绑定为globalThis
  // 如果不是用Object包装一下，防止传入的是基本数据类型
  thisArgs = (thisArgs === undefined || thisArgs === null) ? globalThis : Object(thisArgs)

  // 创建一个symbol作为key，防止属性相同，覆盖原有属性
  const sym = Symbol()

  // 添加属性
  thisArgs[sym] = fn

  // 执行函数并且返回函数返回值
  return thisArgs[sym](...(delete thisArgs[sym] ? args : []))
}