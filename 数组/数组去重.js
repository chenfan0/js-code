const arr = [1, 1, 77, 8, 9, 77]

// 使用set
const arr1 = Array.from(new Set([...arr]))
const arr2 = [...new Set([...arr])]
console.log(arr1);
console.log(arr2);

// 自己实现去重
function unique(arr) {
  const help = []

  for (let i = 0; i < arr.length; i++) {
    if (help.includes(arr[i])) {
      continue
    }
    help.push(arr[i])
  }

  return help
}
const arr3 = unique(arr)
console.log(arr3);

