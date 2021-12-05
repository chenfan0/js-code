// 红灯3s亮一次，绿灯1s亮一次，黄灯2s亮一次，让这三个灯不断重复亮灯

function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}

// promise实现
function loop() {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      red();
      resolve();
    }, 3000);
  }).then(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        green();
        resolve();
      }, 1000);
    }).then(() => {
      setTimeout(() => {
        setTimeout(() => {
          yellow();
          loop();
        }, 2000);
      });
    });
  });
}
// loop()

// 使用async和await
function task(method, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (method === 'red') {
        red()
      } else if (method === 'green') {
        green()
      } else {
        yellow()
      }
      resolve();
    }, time);
  });
}

async function loop2() {
  await task('red', 3000)
  await task('green', 1000)
  await task('yellow', 2000)
  loop2();
}
loop2();
