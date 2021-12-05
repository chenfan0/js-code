function myInstanceOf(instance, constrctor) {
  // 获取instacne的隐式原型
  let insPro = instance.__proto__
  // 获取构造函数的显示原型
  const consPro = constrctor.prototype

  // 循环判断instance的原型链上手否有constructor的显示原型
  while (insPro) {
    if (insPro === consPro) {
      return true
    }
    insPro = insPro.__proto__
  }
  return false
}


// test code
function foo() {

}

const obj1 = new foo()
console.log(obj1 instanceof foo);   // true
console.log(myInstanceOf(obj1, foo)); // true

console.log(obj1 instanceof Object);
console.log(myInstanceOf(obj1, Object));
