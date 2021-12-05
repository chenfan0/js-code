function create(obj) {
  const fn = function () { };
  fn.prototype = obj
  return new fn()
}

function inherit(son, father) {
  // 让子类原型指向父类原型
  son.prototype = create(father.prototype)
  son.prototype.constructor = son;
}

function Father(name, age) {
  this.name = name;
  this.age = age;
}

Father.prototype.sayHi = function () {
  console.log("Hi");
};

function Son(name, age, id) {
  // 只调用一次父构造函数
  Father.call(this, name, age);
  this.id = id;
}

inherit(Son, Father);

const son = new Son('son', 18, 1)
const son1 = new Son('son1', 19, 2)
console.log(son);
son.sayHi()
console.log(son1);


/**
 * 该方法只调用一次父类构造函数。
 * 是目前最成熟的方法
 */