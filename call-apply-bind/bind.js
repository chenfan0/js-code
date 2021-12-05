Function.prototype.myBind = function (thisArgs, ...args) {
  // 保存函数
  const fn = this

  // 边界判断
  thisArgs = (thisArgs === undefined || thisArgs === null) ? globalThis : Object(thisArgs)

  // 创建唯一key
  const sym = Symbol()

  // 返回函数
  return function (...args1) {
    // 收集所有参赛
    const newArr = [...args, ...args1]
    // 添加属性
    thisArgs[sym] = fn

    // 执行函数返回函数返回值
    return thisArgs[sym](...(delete thisArgs[sym] ? newArr : [])) 
  }
}

// test code
function foo(...args) {
  console.log(this);
  console.log(args);
  return 10
}

const obj = {}

const fn1 = foo.bind(obj, 1, 2)
console.log(fn1(4, 5));

const fn2 = foo.myBind(obj, 1, 2)
console.log(fn2(4, 5));

