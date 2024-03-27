// Implicit variable declarations

// number
let num = 100
console.log(`num = ${num}, type = ${typeof num}`)

num = 200
console.log(`num = ${num}, type = ${typeof num}`)

// can not change the type of num
// the following statement will produce an error related to the type conversion
// num = 'test'

// string
const firstName = 'steve'
console.log(`firstName = ${firstName}, type = ${typeof firstName}`)

// const lastName = "Jobs"
const lastName = 'Jobs'
console.log(`lastName = ${lastName}, type = ${typeof lastName}`)

const address = `USA`
console.log(`address = ${address}, type = ${typeof address}`)

// boolean
const canVote = true
console.log(`canVote = ${canVote}, type = ${typeof canVote}`)

// undefined
let myVar
console.log(`myVar = ${myVar}, type = ${typeof myVar}`)

// object
const myVar2 = null
console.log(`myVar2 = ${myVar2}, type = ${typeof myVar2}`)

// array of numbers
const numbers = [10, 20, 30, 40, 50]
console.log(`numbers = ${numbers}, type = ${typeof numbers}`)

// array of strings
const countries = ['india', 'usa', 'uk', 'japan']
console.log(`countries = ${countries}, type = ${typeof countries}`)
