// load page2.js module
// and return the exported attributes from page2
const page2 = require('./page2')

console.log(page2)

// perform mathematical addition
page2.add(20, 30)

// perform subtraction
page2.subtract(80, 34)
page2.multiply(10, 50)
page2.divide(40, 8)
console.log(`pi = ${page2.PI}`)

console.log(module)
