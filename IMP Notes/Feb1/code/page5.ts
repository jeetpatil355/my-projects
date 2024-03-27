class Person {
  // properties
  private name: String
  public readonly address: String
  private age: Number
  private phone: String

  // methods
  // parameterized constructor
  public constructor(
    name: String,
    age: Number,
    address: String,
    phone: String
  ) {
    this.name = name
    this.age = age
    this.address = address
    this.phone = phone
  }

  // setter or mutator
  public setAge(age: number) {
    if (age > 0 && age < 100) {
      this.age = age
    } else {
      console.log('this is invalid age')
    }
  }

  public setName(name: String) {
    this.name = name
  }

  public setPhone(phone: String) {
    this.phone = phone
  }

  // getter or inspector
  public getAge() {
    return this.age
  }

  public getName() {
    return this.name
  }

  public getAddress() {
    return this.address
  }

  public getPhone() {
    return this.phone
  }

  // facilitator method
  public printInfo() {
    console.log(`name = ${this.name}`)
    console.log(`address = ${this.address}`)
    console.log(`age = ${this.age}`)
    console.log(`phone = ${this.phone}`)
    console.log('-')
  }
}

const p1 = new Person('person1', 20, 'pune', '+91234324')
p1.printInfo()

// p1.age = -100
p1.setAge(1000000)
p1.printInfo()

// p1.address = 'mumbai'
// p1.printInfo()
