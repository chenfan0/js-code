const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.result = undefined;
    Object.defineProperty(this, "callbacks", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: [],
    });

    const resolve = (res) => {
      if (this.status === PENDING) {
        // 判断resolve的参数是否为promise类型
        if (res instanceof MyPromise) {
          // 遍历callbacks防止res中有异步任务
          res.then(
            (res) => {
              this.status = FULFILLED;
              this.result = res;
              this.callbacks.forEach((cb) => {
                const result = cb.onfulfilled && cb.onfulfilled(this.result);
                cb.resolve && cb.resolve(result);
              });
            },
            (rea) => {
              this.status = REJECTED;
              this.result = rea;
              this.callbacks.forEach((cb) => {
                const result = cb.onrejected && cb.onrejected(this.result);
                cb.reject && cb.reject(result);
              });
            }
          );
        } else {
          this.status = FULFILLED;
          this.result = res;
          this.callbacks.forEach((cb) => {
            const result = cb.onfulfilled && cb.onfulfilled(this.result);
            cb.resolve && cb.resolve(result);
          });
        }
      }
    };

    const reject = (rea) => {
      if (this.status === PENDING) {
        if (rea instanceof MyPromise) {
          res.then(
            (res) => {
              this.status = FULFILLED;
              this.result = res;
              this.callbacks.forEach((cb) => {
                const result = cb.onrejected && cb.onrejected(this.result);
                cb.resolve && cb.resolve(result);
              });
            },
            (rea) => {
              this.status = REJECTED;
              this.result = rea;
              this.callbacks.forEach((cb) => {
                const result = cb.onrejected && cb.onrejected(this.result);
                cb.reject && cb.reject(result);
              });
            }
          );
        } else {
          this.status = REJECTED;
          this.result = rea;
          this.callbacks.forEach((cb) => {
            const result = cb.onrejected && cb.onrejected(this.result);
            cb.reject && cb.reject(result);
          });
        }
      }
    };

    try {
      // 执行executor中，捕获错误
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onfulfilled, onrejected) {
    return new MyPromise((resolve, reject) => {
      // then里的代码是微任务
      queueMicrotask(() => {
        // 边界判断传入的是否为函数
        if (typeof onfulfilled !== "function") {
          onfulfilled = () => {};
        }
        if (typeof onrejected !== "function") {
          onrejected = () => {};
        }

        if (this.status === FULFILLED) {
          const result = onfulfilled(this.result);
          // 判断onfulfilled的返回值是否为MyPromise类型
          if (result instanceof MyPromise) {
            result.then((res) => {
              resolve(res);
            }),
              (rea) => {
                reject(rea);
              };
          } else {
            resolve(result);
          }
        }
        if (this.status === REJECTED) {
          const result = onrejected(this.result);
          if (result instanceof MyPromise) {
            result.then((res) => {
              resolve(res);
            }),
              (rea) => {
                reject(rea);
              };
          } else {
            resolve(result);
          }
        }
        // 当执行then时，状态为pending时，将onfulfilled和onrejected函数保存起来
        if (this.status === PENDING) {
          this.callbacks.push({
            onfulfilled,
            onrejected,
            resolve,
            reject,
          });
        }
      });
    });
  }

  catch(onrejected) {
    return this.then(undefined, onrejected);
  }

  static resolve(res) {
    return new MyPromise((resolve) => {
      resolve(res);
    });
  }

  static reject(rea) {
    return new MyPromise((resolve, reject) => {
      reject(rea);
    });
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      queueMicrotask(() => {
        promises.forEach((item) => {
          if (!item instanceof MyPromise) {
            item = MyPromise.resolve(item);
          }
        });

        const fulfilleds = [];
        promises.forEach((promise, index) => {
          promise.then(
            (res) => {
              fulfilleds[index] = res;
              if (fulfilleds.length === promises.length) {
                resolve(fulfilleds);
              }
            },
            (rea) => {
              reject(rea);
            }
          );
        });
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((item) => {
        if (!item instanceof MyPromise) {
          item = MyPromise.resolve(item);
        }
      });

      promises.forEach((promise) => {
        promise.then(
          (res) => {
            resolve(res);
          },
          (rea) => {
            reject(rea);
          }
        );
      });
    });
  }

  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((item) => {
        if (!item instanceof MyPromise) {
          item = MyPromise.resolve(item);
        }
      });
      const result = [];
      promises.forEach((promise, index) => {
        promise.then(
          (res) => {
            result[index] = { status: "fulfilled", value: res };
            if (result.length === promises.length) {
              resolve(result);
            }
          },
          (rea) => {
            result[index] = { status: "rejected", value: rea };
            if (result.length === promises.length) {
              resolve(result);
            }
          }
        );
      });
    });
  }

  static any(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((item) => {
        if (!item instanceof MyPromise) {
          item = MyPromise.resolve(item);
        }
      });
      const reason = [];
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            resolve(res);
          },
          (rea) => {
            reason.push(rea);
            if (reason.length === promises.length) {
              reject(
                new AggregateError("AggregateError: All promises were rejected")
              );
            }
          }
        );
      });
    });
  }

  finally(onfinally) {
    this.then(
      () => {
        onfinally();
      },
      () => {
        onfinally();
      }
    );
  }
}

// const mp1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject('reject')
//   });
// });
// const mp2 = mp1.catch((rea) => {
//   console.log(rea, 'catch');
//   return rea
// })

// const mp3 = MyPromise.resolve(1)
// const mp4 = MyPromise.reject(2)

// const p = new Promise((resolve, reject) => { resolve(456) });
// const p2 = p.then((res) => {
//   console.log(res);
// })
// const p3 = p2.then(1)
// console.log(p3, 'p3');

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(
      new Promise((resolve, reject) => {
        // setTimeout(() => {
        reject("p11");
        // });
      })
    );
  }, 100);
});
const p2 = new Promise((resolve, reject) => {
  reject("p2");
});
const p3 = new Promise((resolve, reject) => {
  reject("p3");
});
const p4 = Promise.any([p1, p2, p3]);

const mp1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(
      new MyPromise((resolve, reject) => {
        // setTimeout(() => {
        reject("mp11");
        // });
      })
    );
  }, 100);
});
const mp2 = new MyPromise((resolve, reject) => {
  reject("mp2");
});
const mp3 = new MyPromise((resolve, reject) => {
  reject("mp3");
});
const mp4 = MyPromise.any([mp1, mp2, mp3]);
console.log(p4);
console.log(mp4);

setTimeout(() => {
  // console.log(mp1);
  // console.log(mp2);
  // console.log(mp3, 'mp3');
  // console.log(mp4);
  // console.log(p);
  // console.log(p2);
  // console.log(p4);
  // console.log(mp4);
}, 1000);

// const p = new Promise((resolve, reject) => {
//   resolve(
//     new Promise((resolve, reject) => {
//       reject(1);
//     })
//   );
// });

// const p2 = new MyPromise((resolve, reject) => {
//   resolve(
//     new MyPromise((resolve, reject) => {
//       reject(1);
//     })
//   );
// });
// console.log(p);
// console.log(p2);

// const p = new Promise((resolve, reject) => {
//   resolve('p1')
// }).then(res => {
//   console.log(res);
//   return new Promise((resolve, reject) => { reject('p2') })
// }).then(res => {
//   console.log(res);
// }, rea => {
//   console.log(rea);
// })
// const p = new Promise((resolve, reject) => {
//   resolve('p')
// }).then((res) => {
//   console.log(res);
//   return new Promise((resolve, reject) => resolve('p'))
// }).then(res => {
//   console.log(res, 'res');
// })
// console.log(p);
// const p = new Promise((resolve, reject) => {
//   resolve('1')
// }).then((res) => {
//   setTimeout(() => {
//     return new Promise((resolve) => {
//       resolve(res)
//     })
//   })
// }).then((res) => {
//   console.log(res);
// })
// console.log(p);

// const mp = new MyPromise((resolve, reject) => {
//   resolve('123')
// }).then(res => {
//   console.log(res);
//   setTimeout(() => {
//     return new MyPromise((resolve, reject) => {
//       resolve('then')
//     })
//   })
// }).then((res) => {
//   console.log(res, '---');
// })
// // console.log(p);
// console.log(mp);
