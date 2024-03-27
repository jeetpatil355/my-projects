// Function

// empty, parameter less, named function
function function1() {}

// parameterized function with implicit parameters declaration
function function2(p1, p2) {
  console.log(`${p1} + ${p2} = ${p1 + p2}`)
}

// 30
// function2(10, 20)

// 1020
// function2('10', 20)

function function3(p1: number, p2: number) {
  console.log(`${p1} + ${p2} = ${p1 + p2}`)
}

// 30
function3(10, 20)

// can not call function3 with values other than number
// function3('10', 20)
