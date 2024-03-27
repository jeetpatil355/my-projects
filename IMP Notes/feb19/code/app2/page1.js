// import the file system module
const fs = require('fs')

function function1() {
  // synchronous communication
  // - commands / procedures will get executed sequentially

  // read the contents of the file
  // blocking or synchronous API
  const data = fs.readFileSync('./file1.txt')

  // convert the data (buffer) into string
  console.log(String(data))

  // perform a mathematical operation
  const result = 1232342335 * 2343443545
  console.log(`result = ${result}`)
}

// function1()

function function2() {
  const data = 'this is my information'

  // blocking or synchronous API
  fs.writeFileSync('file2.txt', data)
  console.log(`finished writing the contents`)

  // perform a mathematical operation
  const result = 1232342335 * 2343443545
  console.log(`result = ${result}`)
}

function2()
