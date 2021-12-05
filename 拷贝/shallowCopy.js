const obj = {
  name: 'aaa',
  friends: [1, 2, 3]
}
const arr = [1, 2, 3]

// 方式一: 通过Object.assign实现
const obj1 = Object.assign(obj)
console.log(obj1);

// 方式二：通过扩展运算符
const obj2 = { ...obj }
console.log(obj2);

// 自己实现一个浅拷贝函数、
function shallowCopy(obj) {
  // 判断传入的是对象还是数组
  const cloneObj = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    cloneObj[key] = obj[key]
  }

  return cloneObj
}

const obj3 = shallowCopy(arr)
console.log(obj3);


