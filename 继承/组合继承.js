function Father(name) {
  this.name = name
}
Father.prototype.sayHi = function () {
  console.log('Hi');
}

function Son(name) {
  // 组合继承核心
  Father.call(this, name)
}

// 组合继承核心
Son.prototype = new Father()
Son.prototype.constructor = Son

const son = new Son('son')
son.sayHi()
console.log(son);   // Son { name: 'son' }
console.log(son.__proto__);  // Father { name: undefined, constructor: [Function: Son] }

/**
 * 缺点：会调用两次父类构造方法
 *       子类原型上会有两份相同的属性
 */




