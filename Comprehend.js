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

  if(testFunction) {
    this.test = testFunction
    return this
  }

  make(actionFunction) {
    const resultArray = []
    const instance = this

    function makeLoop(depth, items=[], arrays=instance.arrays, test=instance.test)  {
      for (const item of arrays[depth]) {
        items.push(item)
        if (arrays[depth+1]) {
          makeLoop(depth+1, items)
        } else if ((!test || (test && test(...items))) && depth+1 === arrays.length) {
          resultArray.push(actionFunction(...items))
        }
        items.pop()
      }
    }

    makeLoop(0)
    return resultArray
  }
}

module.exports = Comprehend
