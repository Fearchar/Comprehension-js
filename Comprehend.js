class Comprehend {
  constructor() {
    this.arrays = []
    this.test = null // function
  }

  static for(array) {
    const instance = new Comprehend()
    instance.arrays.push(array)
    return instance
  }

  for(array) {
    this.arrays.push(array)
    return this
  }

  if(callback) { // Only lets you access deepest loop. This is also due to placement in loop() within make()
    this.test = callback
    return this
  }

  make(callback) { // Only lets you access deepest loop
    const resultArray = []
    const instance = this
    function loop(depth, items=[], arrays=instance.arrays, test=instance.test)  {
      for (const item of arrays[depth]) {
        items.push(item)
        if (arrays[depth+1]) loop(depth+1, items)
        else if ((!test || (test && test(item))) && depth+1 === arrays.length) {
          console.log('items', items)
          resultArray.push(callback(...items))
          items.pop()
        }
      }
    }

    loop(0)
    return resultArray
  }
}

module.exports = Comprehend
