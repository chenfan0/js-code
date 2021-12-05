function myCreate(obj) {
  // 方式一：通过修改__proto__实现
  // const returnObj = {}
  // obj.__proto__ = obj
  // return returnObj

  // 方式二：通过new Fn来实现
  const fn = function () {};
  fn.prototype = obj;
  return new fn();
}

// test code
const obj = {};
const obj1 = Object.create(obj);

const obj2 = Object.create(obj);
console.log(obj1.__proto__ === obj2.__proto__);
