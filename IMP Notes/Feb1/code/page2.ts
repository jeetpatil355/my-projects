// Object creation using class

// empty class
class Empty {}

// non-empty class
class Person {
  // properties
  name: String
  address: String
  age: Number
  phone: String
}

// create an object of Person class

// implicit
const person1 = new Person()
person1.name = 'person1'
person1.age = 30
person1.address = 'pune'
person1.phone = '+913423234'
console.log('person1 = ', person1)

// explicit
const person2: Person = new Person()
person2.name = 'person2'
person2.age = 10
person2.address = 'mumbai'
person2.phone = '+913423232'
console.log('person2 = ', person2)
