function myTypeOf(x) {
  return Object.prototype.toString.call(x).slice(8, -1)
}


// test code
console.log(myTypeOf(1));

