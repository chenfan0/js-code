// 1. 调用构造函数获取实例对象
const xhr = new XMLHttpRequest()

// open初始化一个请求
// open第一个参数为请求方式，第二个参数为请求URL，第三个参数为是否采取异步方式，默认为true
xhr.open('GET', 'http://121.40.18.63:9000/dj/radio/hot?cateId=3')

// 设置响应的类型，如果设置了同步请求，那么就不能设置响应类型
/**
 * xhr.responseType 默认值为 'text'
 * 设置为 ''空字符串，效果与默认类型text相同
 * 设置为 'blob' 会返回一个Blob对象
 * 设置为 'arraybuffer' 会返回一个二进制数据的JavaScript ArrayBuffer
 * 设置为 'document', 会返回一个HTML Document 或者XMLDocument
 * 设置为 'json' , 返回json格式的数据
 */
xhr.responseType = 'json'

// 设置超时时间，单位为毫秒
xhr.timeout = 1000

// 超时回调函数
xhr.ontimeout = function () {
  console.error('request timeout');
}

// xhr.setRequestHeader() 设置请求头，必须在open之后，send之前设置
// xhr.setRequestHeader()

xhr.send()

/**
 * 只要readyState改变一次，该函数就会被回调一次
 * readyState有5个状态：
 *  0： 代理被创建，但是还没有调用open方法
 *  1： open方法已经被调用，还未调用send方法
 *  2： send方法已经被调用
 *  3. 已经获取到一部分数据
 *  4. 获取到所欲数据
 */
xhr.onreadystatechange = function () {
  if (this.readyState === 4) {
    if (this.status >= 200 && this.status < 300 || this.status === 304) {
      console.log(this.response);
    } else {
      console.error(this.statusText)
    }
  }
}

// 监听abort事件
xhr.onabort = function () {
  console.log(1);
}

// 调用abort取消发送的请求
// xhr.abort()


