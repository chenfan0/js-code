/**
 * @param {function} fn 需要防抖的函数
 * @param {number} interval 设置执行间隔 ms
 * @param {boolean} leading 第一次事件是否立即执行
 * @param {boolean} trailing 最后一次是否执行 
 * @param {function} resultCb 回调函数，用来获取函数的返回值
 * @returns {Function} 返回一个处理过的回调函数
 */

function throttle(fn, interval, leading = true, trailing = false, resultCb = () => { }) {
  // 上一次函数执行的时间
  let lastTime = 0
  // 用来控制是否第一次立即执行
  let isLeading = true
  // 保存定时器的id
  let time = null

  const _throttle = function (...args) {
    // 获取当前时间
    const nowTime = new Date().getTime()

    // 第一次不需要立即执行
    if (!leading && isLeading) {
      // 将lastTime设置为nowTime
      lastTime = nowTime
      // 将isLeading设置false，这样对后续的lastTime才不会产生影响
      isLeading = false
    }
    // 剩余时间
    const remainTime = nowTime - lastTime

    // 剩余时间比间隔时间大，执行函数
    if (remainTime - interval >= 0) {
      const result = fn.apply(this, args)
      resultCb(result)
      // 将上一次函数执行时间，设置为nowTime
      lastTime = nowTime
    }

    // 如果剩余时间小于间隔时间，并且最后一次需要执行
    if (remainTime < interval && trailing) {
      // 判断是否已经存在定时器，如果存在取消掉
      if (time) clearTimeout(time)
      // 设置定时器
      time = setTimeout(() => {
        const result = fn.apply(this, args)
        resultCb(result)
        // 由于执行该函数时，已经是一轮点击事件的最后一次事件执行
        // 需要将isLeading设置为true，这样保证下次的第一次执行按预期效果执行
        isLeading = true
      }, interval)
    }
  }

  // 添加取消功能
  _throttle.cancel = function () {
    if (time) {
      clearTimeout(time)
      time = null
      lastTime = 0
      isLeading = true
    }
  }

  return _throttle
}

