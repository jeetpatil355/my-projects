const fs = require('fs')

function function1() {
  try {
    const data = fs.readFileSync('./file.txt')
    console.log(String(data))
  } catch (ex) {
    console.log(ex)
  }

  console.log(`this is the last line of the function`)
}

// function1()

function function2() {
  fs.readFile('./file.txt', (error, data) => {
    // check if there was any error while reading the file
    if (error) {
      // there was an error
      console.log(error)
    } else {
      // there was no error
      console.log(data)
    }
  })

  console.log(`this is the last line of the function`)
}

function2()
