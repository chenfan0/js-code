// 可以使用
// JSON.stringify() 和 JSON.parse()来实现深拷贝
// 但是该方法有一下问题
/** 
 * 无法处理函数、
 * 无法处理symbol
 * 无法处理循环引用
*/

function deepClone(value, weakMap = new WeakMap()) {
  // 如果不是对象或则为null，直接返回
  if (typeof value !== "object" || value === null) {
    return value;
  }
  // 引用类型处理

  // 先判断该value对应的对象是否已经被处理过了
  if (weakMap.has(value)) {
    return weakMap.get(value);
  }

  // 处理Number类型
  if (value instanceof Number) {
    return new Number(value.valueOf());
  }

  // 处理Boolean类型
  if (value instanceof Boolean) {
    return new Boolean(value.valueOf());
  }

  // 处理String类型
  if (value instanceof String) {
    return new String(value.valueOf());
  }

  // 处理set类型
  if (value instanceof Set) {
    const set = new Set();
    // 遍历set的每一项
    value.forEach((item) => {
      set.add(deepClone(item));
    });
    return set;
  }

  if (value instanceof Map) {
    const map = new Map();
    // 遍历map的每一项
    value.forEach((item, key) => {
      map.set(key, deepClone(item));
    });
    return map;
  }

  // 处理Date类型
  if (value instanceof Date) {
    return new Date(value.valueOf());
  }

  // 处理RegExp类型
  if (value instanceof RegExp) {
    return new RegExp(value.valueOf());
  }

  // 判断类型是对象还是数组
  const newObj = Array.isArray(value) ? [] : {};
  // 保存已经处理过的对象
  // 当前value作为key，创建的对象作为value
  weakMap.set(value, newObj);

  // 获取所有的key
  const keys = Object.keys(value);
  keys.forEach((key) => {
    newObj[key] = deepClone(value[key], weakMap);
  });

  // 获取所有symbol的属性
  const syms = Object.getOwnPropertySymbols(value);
  syms.forEach((sym) => {
    newObj[sym] = deepClone(value[sym], weakMap);
  });

  return newObj;
}

// test code
const sym1 = Symbol(1);
const sym2 = Symbol(2);

const obj = {
  name: "aaa",
  friends: [111, 222, 333],
  foo() {
    console.log(123);
  },
  [sym1]: "sym1",
  sym2: [sym2],
  set: new Set(["1", "2"]),
  map: new Map([
    ["aaa", 111],
    ["bbb", 222],
  ]),
  number: new Number(),
  string: new String(),
  boolean: new Boolean(),
  bigint: BigInt(10),
  und: undefined,
  nul: null,
  date: new Date(),
  reg: /\.js$/,
};

obj.circle = obj;
const obj1 = deepClone(obj);
console.log(obj);
console.log(obj1);
