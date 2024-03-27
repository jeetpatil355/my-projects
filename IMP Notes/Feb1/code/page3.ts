class Person {
  // properties
  name: String
  address: String
  age: Number
  phone: String

  // methods
  // default constructor
  constructor() {
    console.log('inside a constructor')
    this.name = ''
    this.age = 0
    this.address = ''
    this.phone = ''
  }
}

// function myFunction() {}

const p1 = new Person()
p1.name = 'person1'
p1.address = 'pune'
console.log(p1)

const p2 = new Person()
p2.name = 'person2'
p2.address = 'mumbai'
p2.phone = '+91234324'
p2.age = 30
console.log(p2)
