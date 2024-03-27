// association
// one-to-one relationship
// - Person has-an address
// - House has-an address

class Address {
  private city: String
  private state: String
  private country: String
  private zipCode: String

  constructor(city: String, state: String, country: String, zipCode: String) {
    this.city = city
    this.state = state
    this.country = country
    this.zipCode = zipCode
  }

  printAddress() {
    console.log(`city = ${this.city}`)
    console.log(`state = ${this.state}`)
    console.log(`country = ${this.country}`)
    console.log(`zipCode = ${this.zipCode}`)
  }
}

class Person {
  private name: String
  private address: Address
  private age: Number

  constructor(
    name: String,
    age: Number,
    city: String,
    state: String,
    country: String,
    zipCode: String
  ) {
    this.name = name
    this.age = age

    // associating an object of class Address
    this.address = new Address(city, state, country, zipCode)
  }

  printInfo() {
    console.log(`name = ${this.name}`)
    console.log(`age = ${this.age}`)

    // printing the address details
    this.address.printAddress()
  }
}

const person = new Person('person1', 20, 'pune', 'mh', 'india', '411041')
person.printInfo()
