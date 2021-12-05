function request(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.responseType = "json";
    xhr.send();

    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if ((this.status >= 200 && this.status < 300) || this.status === 304) {
          resolve(this.response);
        } else {
          reject(this.status);
        }
      }
    };
  });
}


/** 
 * 实现一个批量请求函数 multiRequest(urls, maxNum)，要求如下：
    要求最大并发数 maxNum
    每当有一个请求返回，就留下一个空位，可以增加新的请求
    所有请求完成后，结果按照 urls 里面的顺序依次打出
 */

    
const urls = [
  "http://121.40.18.63:9000/dj/radio/hot?cateId=1",
  "http://121.40.18.63:9000/dj/radio/hot?cateId=2",
  "http://121.40.18.63:9000/dj/radio/hot?cateId=3",
];
function multiRequest(urls, maxNum) {
  // 当前发送的网络请求个数
  let sendCount = 0;
  const result = [];
  // 下标
  let index = 0;

  return new Promise((resolve, reject) => {
    function next() {
      const i = index;
      sendCount++;
      request("get", urls[index]).then((res) => {
        result[i] = res;
        sendCount--;
        // 当有结果返回，判断是否已经全部发送完毕
        if (result.length === urls.length) {
          // 全部请求发送并且返回响应，调用resolve
          return resolve([...result]);
        }
        // 还有请求没发送，继续调用发送
        next();
      });
      index++;
    }
    while (index < urls.length) {
      if (sendCount < maxNum) {
        next();
      } else {
        break;
      }
    }
  });
}

multiRequest(urls, 1).then((res) => {
  console.log(res);
});
