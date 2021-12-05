const source = [
  {
    id: 3,
    pid: 2,
    name: "div",
  },
  {
    id: 1,
    pid: 0,
    name: "body",
  },
  {
    id: 2,
    pid: 1,
    name: "title",
  },
];
function transform(source) {
  const result = [];

  const map = new Map();
  // 将id和对象保存到map中
  source.forEach((item) => {
    map.set(item.id, item);
  });

  // 处理source
  source.forEach((item) => {
    if (map.has(item.pid)) {
      map.set(
        item.pid,
        map.get(item.pid).children
          ? map.get(item.pid).children.push(item)
          : (map.get(item.pid).children = [item])
      );
    } else {
      result.push(item);
    }
  });
  return result;
}

console.log(transform(source));
