function Father(name) {
  this.name = name
  this.friends = [1, 2, 3]
}
Father.prototype.sayHi = function () {
  console.log('Hi');
}

function Son(name, stu) {

  // 借用构造函数实现继承的核心
  Father.call(this, name)

  this.stu = stu
}

const son = new Son('son', 10)
console.log(son);


// 缺点：只能继承父类的实例属性和方法，无法继承原型上的属性和方法
//       每个子类上都会有父类函数的副本，影响性能