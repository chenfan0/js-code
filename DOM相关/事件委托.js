function addEventListener(element, eventType, fn, selector) {
  const el = document.querySelector(element)
  
  el.addEventListener(eventType, function (e) {
    const target = e.target
    //  matches可以判断目标元素是否为 selector
    if (target.matches(selector)) {
      fn.call(target, e)
    }
  })
}

addEventListener('#ul', 'click', function (e) {
  console.log(this.innerHTML);
  console.log(e);
}, 'span')

