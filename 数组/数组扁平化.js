const arr = [123, [1, [2, 3, [4]]], 6,]

// 方式一：使用flat函数
const flatArr = arr.flat(Infinity)
console.log(flatArr);

// 通过递归实现
function myFlat1(arr) {
  // 定义变量保存结果
  const result = []
  // 遍历数组
  for (const item of arr) {
    if (Array.isArray(item)) {
      // 该项是数组，递归调用myFlat函数
      result.push(...myFlat1(item)) 
    } else {
      result.push(item)
    }
  }
  return result
}
const arr1 = myFlat1(arr)
console.log(arr1);

// 通过reduce实现
function myFlay2(arr) {
  return arr.reduce((prev, now) => {
    return Array.isArray(now) ? [...prev, ...myFlay2(now)] : [...prev, now]
  }, [])
}
const arr2 = myFlay2(arr)
console.log(arr2);
