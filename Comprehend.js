class Comprehend {
  constructor() {
    this.arrays = []
    this.test = null
  }

  for(array) {
    this.arrays.push(array)
    return this
  }

  static for(array) {
    return new Comprehend().for(array)
  }

  if(test) {
    this.test = test
    return this
  }

  make(action) {
    const resultArray = []
    const arrays = this.arrays
    const test = this.test

    function makeLoop(depth=0, items=[])  {
      for (const item of arrays[depth]) {
        items.push(item)
        if (arrays[depth+1]) {
          makeLoop(depth+1, items)
        } else if (!test || test(...items)) {
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
