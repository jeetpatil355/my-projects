// Explicit variable declaration

// number
const num: Number = 100
console.log(`num = ${num}, type = ${typeof num}`)

// string
const firstName: String = 'steve'
console.log(`firstName = ${firstName}, type = ${typeof firstName}`)

// boolean
const canVote: Boolean = false
console.log(`canVote = ${canVote}, type = ${typeof canVote}`)

// undefined
let myVar: undefined
console.log(`myVar = ${myVar}, type = ${typeof myVar}`)

// null
let myVar2: null = null
console.log(`myVar2 = ${myVar2}, type = ${typeof myVar2}`)

// union of Number and String
let result: Number | String = 404
console.log(`result = ${result}, type = ${typeof result}`)

result = 'success'
console.log(`result = ${result}, type = ${typeof result}`)

// result = true

// the variable can store any type of value (number, string, boolean etc.)
let myResult: any = 100
myResult = 'test'
myResult = true
myResult = undefined
myResult = null

// object
const person: Object = {
  name: 'person1',
  age: 30,
  email: 'person1@test.com',
}
console.log(`type of person = ${typeof person}, person = `, person)
person['phone'] = '+91234343424'
console.log(`type of person = ${typeof person}, person = `, person)

// object
const mobile: { model: String; company: String; price: Number } = {
  model: 'iPhone',
  company: 'Apple',
  price: 206000,

  // not allowed to add anything other then model, company and price
  // gpu: 'Apple GPU',
}

// you can change the price as its there in the declaration
mobile.price = 256000

// you can NOT add cpu as its not present in the declaration
// mobile.cpu = 'Snapdragon'

// array of numbers
const numbers1: Number[] = [10, 20, 30, 40, 50]
console.log(`numbers1 = ${numbers1}, type = ${typeof numbers1}`)

// array of numbers
const numbers2: Array<Number> = [10, 20, 30, 40, 50]
console.log(`numbers2 = ${numbers2}, type = ${typeof numbers2}`)

// array of Strings
const persons1: String[] = [
  'steve jobs',
  'steve balmar',
  'bill gates',
  'bill joy',
  'alan kay',
]
console.log(`persons1 = ${persons1}, type = ${typeof persons1}`)

// array of Strings
const persons2: Array<String> = [
  'steve jobs',
  'steve balmar',
  'bill gates',
  'bill joy',
  'alan kay',
]
console.log(`persons2 = ${persons2}, type = ${typeof persons2}`)
