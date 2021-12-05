function debounce(fn, delay, immediate = false, resultCb = () => { }) {
  // time用于保存定时器id
  let time = null
  // 用于控制是否第一次立即执行
  let isInvoke = false

  const _debounce = function (...args) {
    // 如果有定时器，清除定时器
    if (time) clearTimeout(time)

    // 处理需要第一次立即执行
    if (!isInvoke && immediate) {
      const result = fn.apply(this, args)
      resultCb(result)
      // 将isInvoke改为true，防止后面点击的事件立即执行
      isInvoke = true
    }

    // 设置定时器
    time = setTimeout(() => {
      const result = fn.apply(this, args)
      resultCb(result)
      // 将isInvoke设为false，这样下一轮的点击的第一次才能立即执行
      isInvoke = false
    }, delay)
  }

  // 添加取消功能
  _debounce.cancel = function () {
    // 如果有定时器
    if (time) {
      // 取消定时器，并且将其他变量恢复为初始值
      clearTimeout(time)
      time = null
      isInvoke = false
    }
  }

  return _debounce
}

