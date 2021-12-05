function compose(...fns) {
  // 判断传入的参数是否都是函数类型
  fns.forEach(fn => {
    if (typeof fn !== 'function') {
      throw new Error('Expected arguments are functions')
    }
  })

  function composeFn(...args) {
    let result
    for (let i = 0; i < fns.length; i++) {
      if (i === 0) {
        // 如果是第一个函数执行，将则该函数的参数是composeFn传入的参数
        // 将返回值保存到result中
        result = fns[i].apply(this, args)
      } else {
        // 不是第一个函数，将上一次的返回值作为参数执行
        result = fns[i].call(this, result)
      }
    }
    // 返回result
    return result
  }

  return composeFn
}



// test code
function foo(n, m) {
  return n * m
}

function bar(m) {
  return m * m
}

const newFn = compose(foo, bar)
console.log(newFn(10, 20));

