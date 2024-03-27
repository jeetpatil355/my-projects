// console.log('hello hell')
// console.error('this is an error')

// exercise 1
// - write a function to get square of numbers from 1 to 100
function function1() {
  const squares = []
  for (let index = 1; index <= 100; index++) {
    squares.push(index ** 2)
  }
  console.log(squares)
}
// function1()

// exercise 2
// - write a function to get cube of only odd numbers from 1 to 100
function function2() {
  const cubes = []
  for (let index = 1; index <= 100; index++) {
    if (index % 2 != 0) {
      cubes.push(index ** 3)
    }
  }

  console.log(cubes)
}

// function2()

// window.alert('hello hell')
