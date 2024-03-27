const fs = require('fs')

function function1() {
  // first param: file path
  // second param: callback function
  //  - first param: error
  // - second param: data (contents of the file)

  // non-blocking or asynchronous api
  fs.readFile('./file1.txt', (error, data) => {
    console.log(String(data))
  })

  //   const callback = (error, data) => {
  //     console.log('contents of the file => ', String(data))
  //   }
  //   fs.readFile('./file1.txt', callback)

  // perform a mathematical operation
  const result = 1232342335 * 2343443545
  console.log(`result = ${result}`)
}

// function1()

function function2() {
  const data = 'this is my information'

  // non-blocking api
  fs.writeFile('file2.txt', data, (error) => {
    console.log(`error`, error)
  })

  // perform a mathematical operation
  const result = 1232342335 * 2343443545
  console.log(`result = ${result}`)
}

function2()
