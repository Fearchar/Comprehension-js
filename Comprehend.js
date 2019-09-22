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

  if(callback) {
    this.test = callback
    return this
  }

  make(callback) {
    const newArray = []

    function loop(arraysIndex, arrays, instance) {
      for (const item of arrays[arraysIndex]) {
        if (arrays[arraysIndex+1]) loop(arraysIndex+1, arrays, instance)
        if (((instance.test && instance.test(item)) || !instance.test) &&   arraysIndex+1 === arrays.length) {
          newArray.push(callback(item))
        }
      }
    }

    loop(0, this.arrays, this)
    return newArray
  }
}

module.exports = Comprehend
