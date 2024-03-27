class Person {
  // properties
  name: String
  address: String
  age: Number
  phone: String

  // methods
  // parameterized constructor
  constructor(name: String, age: Number, address: String, phone: String) {
    this.name = name
    this.age = age
    this.address = address
    this.phone = phone
  }

  // facilitator method
  printInfo() {
    console.log(`name = ${this.name}`)
    console.log(`address = ${this.address}`)
    console.log(`age = ${this.age}`)
    console.log(`phone = ${this.phone}`)
  }
}

const p1 = new Person('person1', 30, 'mumbai', '+914345534')
p1.printInfo()

// create a class name Car having
// properties: model, company, price, color, fuelType
// methods: constructor, printInfo

console.log('-')
console.log('-')

class Car {
  // property list
  model: String
  company: String
  price: Number
  color: String
  fuelType: String

  // methods
  constructor(
    model: String,
    company: String,
    price: Number,
    color: String,
    fuelType: String
  ) {
    this.model = model
    this.company = company
    this.price = price
    this.color = color
    this.fuelType = fuelType
  }

  printInfo() {
    console.log(`model = ${this.model}`)
    console.log(`company = ${this.company}`)
    console.log(`price = ${this.price}`)
    console.log(`color = ${this.color}`)
    console.log(`fuelType = ${this.fuelType}`)
  }
}

const c1 = new Car('triber', 'renault', 1000000, 'silver', 'petrol')
c1.printInfo()

console.log('-')

const c2 = new Car('i20', 'hyundai', 1200000, 'white', 'petrol')
c2.printInfo()
