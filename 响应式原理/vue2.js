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
  Object.keys(obj).forEach(key => {
    let item = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        const dep = getDep(obj, key)
        dep.addDep()
        return item
      },
      set(value) {
        const dep = getDep(obj, key)
        // obj[key] 这里 item 不能改成obj[key]，不然会死循环
        item = value
        dep.notify()
      }
    })
  })
  return obj
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


