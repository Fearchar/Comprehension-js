class Comprehend {
  constructor() {
    this.arrays = []
    this.test = null
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

  if(test) {
    this.test = test
    return this
  }

  make(action) {
    const resultArray = []
    const instance = this

    function makeLoop(depth=0, items=[], arrays=instance.arrays, test=instance.test)  {
      for (const item of arrays[depth]) {
        items.push(item)
        if (arrays[depth+1]) {
          makeLoop(depth+1, items)
        } else if (!test || (test && test(...items))) {
          resultArray.push(action(...items))
        }
        items.pop()
      }
    }

    makeLoop()
    return resultArray
  }
}

module.exports = Comprehend
