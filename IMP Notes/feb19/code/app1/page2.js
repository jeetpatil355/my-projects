function add(p1, p2) {
  console.log(`${p1} + ${p2} = ${p1 + p2}`)
}

function subtract(p1, p2) {
  console.log(`${p1} - ${p2} = ${p1 - p2}`)
}

function multiply(p1, p2) {
  console.log(`${p1} * ${p2} = ${p1 * p2}`)
}

function divide(p1, p2) {
  console.log(`${p1} / ${p2} = ${p1 / p2}`)
}

const PI = 3.14

// export a function for others to consume
module.exports = {
  add,
  subtract,
  multiply,
  divide,
  PI,
}

console.log(module)
