class Dep {
  constructor() {
    this.effects = new Set()
  }

  // 添加依赖
  addDep() {
    if (effect) {
      this.effects.add(effect)
    }
  }

  // 通知重新执行
  notify() {
    this.effects.forEach(effect => {
      effect()
    })
  }
}
// 使用weakMap保存数据
const weakMap = new WeakMap()

function getDep(target, key) {
  let targetDep = weakMap.get(target)
  if (!targetDep) {
    weakMap.set(target, new Map())
    targetDep = weakMap.get(target)
  }

  let keyDep = targetDep.get(key)
  if (!keyDep) {
    targetDep.set(key, new Dep())
    keyDep = targetDep.get(key)
  }
  return keyDep
}


function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const dep = getDep(target, key)
      dep.addDep()
      return Reflect.get(target, key, receiver)
    },
    set(target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver)
      const dep = getDep(target, key)
      dep.notify()
      return true
    }
  })
}

let effect = null
function watchEffect(fn) {
  effect = fn
  fn()
  effect = null
}


// test code
const obj = reactive({
  name: 'obj',
  age: 18
})
const obj1 = reactive({
  name: 'obj1',
  address: 'aaa'
})
watchEffect(() => {
  console.log(obj.name);
  
  console.log(obj1.address);
})

watchEffect(() => {
  console.log(obj1.address);
})

obj.name = 'obj1'
obj1.address = 'bbb'


