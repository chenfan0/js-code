class Bus {
  constructor() {
    this.task = {}
  }

  on(eventName, cb) {
    // 判断该事件名是否已经存在
    if (this.task[eventName]) {
      this.task[eventName].push(cb)
    } else {
      this.task[eventName] = [cb]
    }
  }

  emit(eventName, ...args) {
    // 根据事件名，找到对应的回调函数列表，挨个执行即可
    if (this.task[eventName]) {
      this.task[eventName].forEach((item) => {
        item(...args)
      })
    }
  }

  off(eventName, cb) {
    // 通过事件名，找到回调函数数组，在通过cb，删除对应的回调
    if (this.task[eventName]) {
      this.task[eventName] = this.task[eventName].filter(item => {
        return item !== cb
      })
    }
  }

  clear() {
    this.task = {}
  }
}

// test code
const cfBus = new Bus()

function test1(...args) {
  console.log(args);
}

cfBus.on('test', test1)

cfBus.on('test', (x) => {
  console.log(10 + x);
})

cfBus.emit('test', { obj: 123 }, 456)
// cfBus.off('test', test1)
// cfBus.clear()
cfBus.emit('test', { obj: 123 }, 456)

