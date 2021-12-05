function mySetInterval(fn, timeout) {
  const time = {
    flag: true
  }
  function foo() {
    setTimeout(() => {
      fn()
      if (time.flag) {
        foo()
      }
    }, timeout)
  }
  foo()
  return time
}


const timeId = mySetInterval(() => {
  console.log(1);
}, 1000)

setTimeout(() => {
  timeId.flag = false
}, 5000)
