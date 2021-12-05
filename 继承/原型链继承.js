function Father(name) {
  this.name = name
  this.friends = [1, 2, 3]
}
Father.prototype.sayHi = function () {
  console.log('Hi');
}

function Son(name) {
  this.name = name
}
// 原型链继承的关键，将子类原型指向父类的实例
// 这样就能通过原型链继承父类原型上的方法
Son.prototype = new Father()
// 将constructor指回son
Son.prototype.constructor = Son

const son = new Son('son')
const son1 = new Son('son1')
son.sayHi()

console.log(son.friends);   // [1, 2, 3]
son.friends[0] = 2
console.log(son1.friends);   // [2, 2, 3]

// 缺点: 多个实例对引用类型的操作会互相影响
