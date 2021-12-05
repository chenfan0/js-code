const box = document.querySelector("#box");
const body = document.body;

// 保存是否拖动的变量
let drag = false;

// 点击时鼠标的坐标
let originX
let originY
// 点击之前，盒子的left和right
let lastLeft = getComputedStyle(box).left
let lastTop = getComputedStyle(box).top

body.addEventListener("mousemove", function (e) {
  if (drag) {
    box.style.left = parseInt(lastLeft) + e.clientX - originX + 'px'
    box.style.top =  parseInt(lastTop) + e.clientY - originY + 'px'
  }
});

box.addEventListener("mousedown", function (e) {
  // 点击，将drag置为true
  drag = true;
  // 获取当前鼠标坐标
  originX = e.clientX
  originY = e.clientY
  // 保存点击那一刻的盒子left和top
  lastTop = getComputedStyle(box).top
  lastLeft = getComputedStyle(box).left
});


box.addEventListener("mouseup", function (e) {
  drag = false;
});

box.addEventListener('mouseout', function (e) {
  drag = false
})
