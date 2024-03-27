// object with constructor function

function Person(name: String, address: String, age: Number) {
  this.name = name
  this.address = address
  this.age = age
}

const person1 = new Person('person1', 'pune', 20)
console.log(person1)
console.log(`type of person = ${typeof person1}`)
