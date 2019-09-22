class Comprehend {
  constructor() {
    this.array = null // []
    this.test = null // function
  }

  static for(array) {
    this.array = array
    this.test = null
    return this
  }

  static if(callback) {
    this.test = callback
    return this
  }

  static make(callback) {
    const newArray = []
    for (const item of this.array) {
      if (
        (this.test && this.test(item)) ||
        !this.test) {
        newArray.push(callback(item))
      }
    }
    return newArray
  }
}

export default Comprehend
