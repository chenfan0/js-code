// 打印数组项，奇数打印后暂停1s，偶数打印完暂停两秒
const arr = [1, 8, 7, 4, 3, 2];

// promise和async以及await实现
function log(item) {
  console.log(item);
  const time = item % 2 === 0 ? 2000 : 1000
  return new Promise((resolve) => setTimeout(resolve, time))
}

async function print(arr) {
  for (const item of arr) {
    await log(item)
  }
}

// print(arr)

// 同步代码实现
function sync(arr) {
  for (const item of arr) {
    const time = item % 2 === 0 ? 2000 : 1000
    console.log(item)
    const now = new Date().getTime()
    while (new Date().getTime() - now < time) {}
  }
}

// sync(arr)

bar(arr)